import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { toClientErrorMessage } from './_lib/clientError.js';
import {
  findOrderByEmailAndReference,
  PurchaseValidationError,
  validatePurchasedOrder,
} from './_lib/lemonsqueezy.js';
import { getProduct, STOREFRONT_PRODUCT_ID } from './_lib/products.js';
import {
  getWizardMaxDevicesPerOrder,
  getWizardSessionSecret,
} from './_lib/env.js';
import { hashIpForRateLimit, resolveWizardDeviceKey } from './_lib/requestFingerprint.js';
import { consumeRateLimit } from './_lib/rateLimit.js';
import { createWizardSessionToken } from './_lib/wizardSession.js';
import {
  isUnlockRegistryAvailable,
  requestWizardUnlock,
} from './_lib/wizardUnlockRegistry.js';
import {
  sendWizardUnlockIssue,
  WIZARD_UNLOCK_ISSUES,
} from './_lib/wizardUnlockErrors.js';

type VerifyPurchaseBody = {
  email?: string;
  orderId?: string;
  productId?: string;
  deviceId?: string;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapValidationError(error: PurchaseValidationError) {
  switch (error.validationCode) {
    case 'ORDER_REFUNDED':
      return WIZARD_UNLOCK_ISSUES.orderRefunded();
    case 'ORDER_NOT_PAID':
      return WIZARD_UNLOCK_ISSUES.orderNotPaid();
    case 'TEST_ORDER_LIVE_MODE':
      return WIZARD_UNLOCK_ISSUES.testOrderLiveMode();
    case 'WRONG_PRODUCT':
      return WIZARD_UNLOCK_ISSUES.wrongProduct();
    default:
      return WIZARD_UNLOCK_ISSUES.verifyNotFound();
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as VerifyPurchaseBody;
    const email = body.email?.trim() ?? '';
    const orderRef = body.orderId?.trim() ?? '';
    const productId = body.productId?.trim() || STOREFRONT_PRODUCT_ID;

    if (!email || !orderRef) {
      return sendWizardUnlockIssue(res, 400, WIZARD_UNLOCK_ISSUES.missingFields());
    }

    const secret = getWizardSessionSecret();
    const ipHash = hashIpForRateLimit(req, secret);

    const ipLimit = await consumeRateLimit(`ip:${ipHash}`, 20, 60 * 60);
    if (!ipLimit.allowed) {
      return sendWizardUnlockIssue(res, 429, WIZARD_UNLOCK_ISSUES.rateLimitIp());
    }

    const product = getProduct(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const order = await findOrderByEmailAndReference(email, orderRef);
    if (!order) {
      await delay(400);
      return sendWizardUnlockIssue(res, 401, WIZARD_UNLOCK_ISSUES.verifyNotFound());
    }

    const orderLimit = await consumeRateLimit(`order:${order.id}`, 10, 60 * 60);
    if (!orderLimit.allowed) {
      return sendWizardUnlockIssue(res, 429, WIZARD_UNLOCK_ISSUES.rateLimitOrder());
    }

    try {
      validatePurchasedOrder(order, productId);
    } catch (err) {
      await delay(400);
      if (err instanceof PurchaseValidationError) {
        return sendWizardUnlockIssue(res, 401, mapValidationError(err));
      }
      throw err;
    }

    if (isUnlockRegistryAvailable()) {
      const deviceKey = resolveWizardDeviceKey(req, secret, body.deviceId);
      const unlock = await requestWizardUnlock(
        order.id,
        deviceKey,
        getWizardMaxDevicesPerOrder(),
      );

      // Soft cap: requestWizardUnlock replaces the oldest slot when full.
      // Hard DEVICE_LIMIT is retained only as a defensive fallback.
      if (!unlock.allowed) {
        await delay(400);
        return sendWizardUnlockIssue(
          res,
          403,
          WIZARD_UNLOCK_ISSUES.deviceLimit(getWizardMaxDevicesPerOrder()),
        );
      }
    } else {
      console.warn('[verify-purchase] KV not configured — device limits disabled');
    }

    const session = createWizardSessionToken(
      {
        email: order.email,
        orderId: order.id,
        productId,
      },
      secret,
    );

    return res.status(200).json({
      token: session.token,
      expiresAt: session.expiresAt,
      email: order.email,
      orderId: order.id,
      productId,
      productName: product.name,
    });
  } catch (err) {
    console.error('[verify-purchase]', err);
    const issue = WIZARD_UNLOCK_ISSUES.serverError();
    issue.error = toClientErrorMessage(err, issue.error);
    return sendWizardUnlockIssue(res, 500, issue);
  }
}
