import { getLemonSqueezyApiKey, getLemonSqueezyVariantStarterKit, isLiveLemonSqueezyMode } from './env.js';
import { getProduct } from './products.js';

const LS_API = 'https://api.lemonsqueezy.com/v1';

export type LemonSqueezyOrder = {
  id: string;
  orderNumber: number;
  identifier: string;
  email: string;
  status: string;
  refunded: boolean;
  variantId: number | null;
  productName: string | null;
  testMode: boolean;
};

type LemonOrderAttributes = {
  user_email?: string;
  user_name?: string;
  status?: string;
  refunded?: boolean;
  order_number?: number;
  identifier?: string;
  test_mode?: boolean;
  first_order_item?: {
    variant_id?: number;
    product_name?: string;
  } | null;
};

type LemonOrderResource = {
  id: string;
  attributes: LemonOrderAttributes;
};

type LemonListResponse = {
  data: LemonOrderResource[];
};

function lsHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getLemonSqueezyApiKey()}`,
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  };
}

function mapOrder(resource: LemonOrderResource): LemonSqueezyOrder {
  const attrs = resource.attributes;
  return {
    id: resource.id,
    orderNumber: attrs.order_number ?? Number.parseInt(resource.id, 10),
    identifier: attrs.identifier ?? '',
    email: (attrs.user_email ?? '').trim().toLowerCase(),
    status: attrs.status ?? '',
    refunded: Boolean(attrs.refunded),
    variantId: attrs.first_order_item?.variant_id ?? null,
    productName: attrs.first_order_item?.product_name ?? null,
    testMode: Boolean(attrs.test_mode),
  };
}

async function fetchOrderById(orderId: string): Promise<LemonSqueezyOrder | null> {
  const response = await fetch(`${LS_API}/orders/${encodeURIComponent(orderId)}`, {
    headers: lsHeaders(),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const body = await response.text();
    console.error('[lemonsqueezy] fetch order failed', response.status, body);
    throw new Error('Could not verify purchase with Lemon Squeezy');
  }

  const json = (await response.json()) as { data: LemonOrderResource };
  return mapOrder(json.data);
}

async function fetchOrderByNumber(orderNumber: string): Promise<LemonSqueezyOrder | null> {
  const params = new URLSearchParams({
    'filter[order_number]': orderNumber,
    'page[size]': '1',
  });

  const response = await fetch(`${LS_API}/orders?${params}`, {
    headers: lsHeaders(),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error('[lemonsqueezy] fetch order by number failed', response.status, body);
    throw new Error('Could not verify purchase with Lemon Squeezy');
  }

  const json = (await response.json()) as LemonListResponse;
  const resource = json.data[0];
  return resource ? mapOrder(resource) : null;
}

async function listOrdersByEmail(email: string): Promise<LemonSqueezyOrder[]> {
  const params = new URLSearchParams({
    'filter[user_email]': email,
    'page[size]': '25',
  });

  const response = await fetch(`${LS_API}/orders?${params}`, {
    headers: lsHeaders(),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error('[lemonsqueezy] list orders failed', response.status, body);
    throw new Error('Could not verify purchase with Lemon Squeezy');
  }

  const json = (await response.json()) as LemonListResponse;
  return json.data.map(mapOrder);
}

function orderRefMatches(order: LemonSqueezyOrder, orderRef: string): boolean {
  return (
    order.id === orderRef ||
    String(order.orderNumber) === orderRef ||
    order.identifier === orderRef
  );
}

function emailMatches(order: LemonSqueezyOrder, email: string): boolean {
  return order.email === email;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeOrderRef(orderRef: string): string {
  return orderRef.trim().replace(/^#/, '');
}

export async function findOrderByEmailAndReference(
  rawEmail: string,
  rawOrderRef: string,
): Promise<LemonSqueezyOrder | null> {
  const email = normalizeEmail(rawEmail);
  const orderRef = normalizeOrderRef(rawOrderRef);

  if (!email || !orderRef) {
    return null;
  }

  if (/^\d+$/.test(orderRef)) {
    const byId = await fetchOrderById(orderRef);
    if (byId && emailMatches(byId, email) && orderRefMatches(byId, orderRef)) {
      return byId;
    }

    const byNumber = await fetchOrderByNumber(orderRef);
    if (byNumber && emailMatches(byNumber, email) && orderRefMatches(byNumber, orderRef)) {
      return byNumber;
    }
  }

  const orders = await listOrdersByEmail(email);
  return orders.find((order) => orderRefMatches(order, orderRef)) ?? null;
}

export class PurchaseValidationError extends Error {
  constructor(public readonly validationCode: PurchaseValidationCode) {
    super(validationCode);
  }
}

export type PurchaseValidationCode =
  | 'ORDER_NOT_PAID'
  | 'ORDER_REFUNDED'
  | 'TEST_ORDER_LIVE_MODE'
  | 'WRONG_PRODUCT';

export function validatePurchasedOrder(order: LemonSqueezyOrder, productId: string): void {
  const product = getProduct(productId);
  if (!product) {
    throw new PurchaseValidationError('WRONG_PRODUCT');
  }

  if (order.status !== 'paid') {
    throw new PurchaseValidationError('ORDER_NOT_PAID');
  }

  if (order.refunded) {
    throw new PurchaseValidationError('ORDER_REFUNDED');
  }

  if (isLiveLemonSqueezyMode() && order.testMode) {
    throw new PurchaseValidationError('TEST_ORDER_LIVE_MODE');
  }

  const expectedVariant = getLemonSqueezyVariantStarterKit();
  if (expectedVariant && order.variantId != null && String(order.variantId) !== expectedVariant) {
    throw new PurchaseValidationError('WRONG_PRODUCT');
  }
}
