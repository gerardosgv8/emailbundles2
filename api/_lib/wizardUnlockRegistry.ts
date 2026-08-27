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

export type DeviceReplacement = {
  at: string;
  evictedDeviceKey: string;
  newDeviceKey: string;
};

export type OrderUnlockRecord = {
  orderId: string;
  slots: DeviceSlot[];
  denied: DeniedUnlockAttempt[];
  replacements?: DeviceReplacement[];
};

export type UnlockDecision =
  | {
      allowed: true;
      record: OrderUnlockRecord;
      reusedDevice: boolean;
      replacedOldest?: boolean;
    }
  | { allowed: false; reason: 'device_cap'; record: OrderUnlockRecord };

const ORDER_KEY_PREFIX = 'wizard:order:';

function orderKey(orderId: string): string {
  return `${ORDER_KEY_PREFIX}${orderId}`;
}

async function loadRecord(orderId: string): Promise<OrderUnlockRecord> {
  const existing = await getKv().get<OrderUnlockRecord>(orderKey(orderId));
  return existing ?? { orderId, slots: [], denied: [], replacements: [] };
}

async function saveRecord(record: OrderUnlockRecord): Promise<void> {
  await getKv().set(orderKey(record.orderId), record);
}

function pushReplacement(record: OrderUnlockRecord, entry: DeviceReplacement): void {
  const list = record.replacements ?? [];
  list.push(entry);
  record.replacements = list.length > 30 ? list.slice(-30) : list;
}

/**
 * Soft 2-device cap: known browsers reuse a slot; a new browser replaces the
 * least-recently-used slot so buyers are not permanently locked out.
 */
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
    const sorted = [...record.slots].sort((a, b) =>
      a.lastUnlockAt.localeCompare(b.lastUnlockAt),
    );
    const evicted = sorted[0];
    record.slots = sorted.slice(1);
    record.slots.push({ deviceKey, firstSeenAt: now, lastUnlockAt: now });
    pushReplacement(record, {
      at: now,
      evictedDeviceKey: evicted.deviceKey,
      newDeviceKey: deviceKey,
    });
    await saveRecord(record);
    console.warn('[wizard-unlock] replaced oldest device slot', {
      orderId,
      slotCount: record.slots.length,
      replacementCount: record.replacements?.length ?? 0,
    });
    return { allowed: true, record, reusedDevice: false, replacedOldest: true };
  }

  record.slots.push({ deviceKey, firstSeenAt: now, lastUnlockAt: now });
  await saveRecord(record);
  return { allowed: true, record, reusedDevice: false };
}

export type SharingSignals = {
  registeredDevices: number;
  deniedUnlockAttempts: number;
  deviceReplacements: number;
  likelySharing: boolean;
  notes: string[];
};

export function analyzeSharingSignals(record: OrderUnlockRecord): SharingSignals {
  const notes: string[] = [];
  const deniedUnlockAttempts = record.denied.length;
  const registeredDevices = record.slots.length;
  const deviceReplacements = record.replacements?.length ?? 0;

  if (deniedUnlockAttempts > 0) {
    notes.push(
      `${deniedUnlockAttempts} unlock attempt(s) were blocked under the old hard device cap.`,
    );
  }

  if (deviceReplacements >= 3) {
    notes.push(
      `${deviceReplacements} device slot replacement(s) — receipt may be circulating across many browsers.`,
    );
  }

  const distinctDeniedDevices = new Set(record.denied.map((entry) => entry.deviceKey)).size;
  if (distinctDeniedDevices >= 2) {
    notes.push(`${distinctDeniedDevices} different blocked devices tried to unlock.`);
  }

  const likelySharing = deviceReplacements >= 3 || deniedUnlockAttempts > 0;

  return {
    registeredDevices,
    deniedUnlockAttempts,
    deviceReplacements,
    likelySharing,
    notes,
  };
}

export async function getOrderUnlockAudit(orderId: string): Promise<OrderUnlockRecord | null> {
  const record = await getKv().get<OrderUnlockRecord>(orderKey(orderId));
  return record ?? null;
}

/** Support: clear device slots so the buyer can unlock again (does not refund or revoke purchase). */
export async function clearOrderUnlockRecord(orderId: string): Promise<boolean> {
  const key = orderKey(orderId);
  const existing = await getKv().get<OrderUnlockRecord>(key);
  if (!existing) {
    return false;
  }
  await getKv().del(key);
  return true;
}
