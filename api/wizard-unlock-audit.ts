import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors } from './_lib/cors.js';
import { getWizardAuditSecret } from './_lib/env.js';
import { readBearerToken } from './_lib/wizardSession.js';
import {
  analyzeSharingSignals,
  clearOrderUnlockRecord,
  getOrderUnlockAudit,
  isUnlockRegistryAvailable,
} from './_lib/wizardUnlockRegistry.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'GET' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auditSecret = getWizardAuditSecret();
  const token = readBearerToken(req.headers.authorization);
  if (!auditSecret || token !== auditSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!isUnlockRegistryAvailable()) {
    return res.status(503).json({ error: 'Unlock registry is not configured (KV missing).' });
  }

  const orderId = typeof req.query.orderId === 'string' ? req.query.orderId.trim() : '';
  if (!orderId) {
    return res.status(400).json({ error: 'orderId query parameter is required.' });
  }

  if (req.method === 'DELETE') {
    const cleared = await clearOrderUnlockRecord(orderId);
    if (!cleared) {
      return res.status(404).json({ error: 'No unlock history for this order.' });
    }
    return res.status(200).json({
      orderId,
      cleared: true,
      message: 'Device slots cleared. Buyer can unlock again from up to 2 devices.',
    });
  }

  const record = await getOrderUnlockAudit(orderId);
  if (!record) {
    return res.status(404).json({ error: 'No unlock history for this order.' });
  }

  const signals = analyzeSharingSignals(record);

  return res.status(200).json({
    orderId: record.orderId,
    slots: record.slots.map((slot) => ({
      deviceKey: slot.deviceKey,
      firstSeenAt: slot.firstSeenAt,
      lastUnlockAt: slot.lastUnlockAt,
    })),
    deniedAttempts: record.denied.length,
    replacements: record.replacements?.length ?? 0,
    sharingSignals: signals,
  });
}
