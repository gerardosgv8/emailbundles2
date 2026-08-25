import { getKv, isUnlockRegistryAvailable } from './kvClient.js';

export { isUnlockRegistryAvailable };

export type DeviceSlot = {
  deviceKey: string;
  firstSeenAt: string;
  lastUnlockAt: string;
};

export type DeniedUnlockAttempt = {
  at: string;
  deviceKey: string;
  reason: 'device_cap';
};

export type OrderUnlockRecord = {
  orderId: string;
  slots: DeviceSlot[];
  denied: DeniedUnlockAttempt[];
};

export type UnlockDecision =
  | { allowed: true; record: OrderUnlockRecord; reusedDevice: boolean }
  | { allowed: false; reason: 'device_cap'; record: OrderUnlockRecord };

const ORDER_KEY_PREFIX = 'wizard:order:';

function orderKey(orderId: string): string {
  return `${ORDER_KEY_PREFIX}${orderId}`;
}

async function loadRecord(orderId: string): Promise<OrderUnlockRecord> {
  const existing = await getKv().get<OrderUnlockRecord>(orderKey(orderId));
  return existing ?? { orderId, slots: [], denied: [] };
}

async function saveRecord(record: OrderUnlockRecord): Promise<void> {
  await getKv().set(orderKey(record.orderId), record);
}

export async function requestWizardUnlock(
  orderId: string,
  deviceKey: string,
  maxDevices: number,
): Promise<UnlockDecision> {
  const record = await loadRecord(orderId);
  const now = new Date().toISOString();
  const existing = record.slots.find((slot) => slot.deviceKey === deviceKey);

  if (existing) {
    existing.lastUnlockAt = now;
    await saveRecord(record);
    return { allowed: true, record, reusedDevice: true };
  }

  if (record.slots.length >= maxDevices) {
    record.denied.push({ at: now, deviceKey, reason: 'device_cap' });
    if (record.denied.length > 30) {
      record.denied = record.denied.slice(-30);
    }
    await saveRecord(record);
    console.warn('[wizard-unlock] device cap hit — possible credential sharing', {
      orderId,
      slotCount: record.slots.length,
      deniedCount: record.denied.length,
    });
    return { allowed: false, reason: 'device_cap', record };
  }

  record.slots.push({ deviceKey, firstSeenAt: now, lastUnlockAt: now });
  await saveRecord(record);
  return { allowed: true, record, reusedDevice: false };
}

export type SharingSignals = {
  registeredDevices: number;
  deniedUnlockAttempts: number;
  likelySharing: boolean;
  notes: string[];
};

export function analyzeSharingSignals(record: OrderUnlockRecord): SharingSignals {
  const notes: string[] = [];
  const deniedUnlockAttempts = record.denied.length;
  const registeredDevices = record.slots.length;

  if (deniedUnlockAttempts > 0) {
    notes.push(
      `${deniedUnlockAttempts} unlock attempt(s) blocked after the device limit — someone may have shared the receipt.`,
    );
  }

  if (registeredDevices >= 2 && deniedUnlockAttempts > 0) {
    notes.push('Cap is full and new devices keep trying — strong sharing signal.');
  }

  const distinctDeniedDevices = new Set(record.denied.map((entry) => entry.deviceKey)).size;
  if (distinctDeniedDevices >= 2) {
    notes.push(`${distinctDeniedDevices} different blocked devices tried to unlock.`);
  }

  const likelySharing = deniedUnlockAttempts > 0 || distinctDeniedDevices > 0;

  return {
    registeredDevices,
    deniedUnlockAttempts,
    likelySharing,
    notes,
  };
}

export async function getOrderUnlockAudit(orderId: string): Promise<OrderUnlockRecord | null> {
  const record = await getKv().get<OrderUnlockRecord>(orderKey(orderId));
  return record ?? null;
}
