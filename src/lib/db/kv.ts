/**
 * @module lib/kv
 *
 * Service functions for key value store
 *
 * Exports:
 *  - kvSet(data)
 *  - kvGet(userId, key)
 *
 * Has option to encrypt value
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { StoreKvInput } from "@/types/kv";
import { prisma } from "@/global/prisma";
import { decrypt, encrypt } from "@/lib/utils/encryption";

/**
 * Upserts a key to a value.
 *
 * @param data
 *   Object consisting of `userId` (number), `key` (string), `value` (string), `isEncrypted` (boolean).
 * @returns
 *   Promise<void>.
 */
export async function kvSet(data: StoreKvInput): Promise<void> {
  let value: string | null = null;
  if (data.isEncrypted) {
    value = encrypt(data.value);
  }

  await prisma.keyValue.upsert({
    where: { userId_key: { userId: data.userId, key: data.key } },
    create: { ...data, value: value ? value : data.value },
    update: { value: value ? value : data.value },
  });
}

/**
 * Gets value from key.
 *
 * @param userId
 *   Target user id (number).
 * @param key
 *   Target value's key (string).
 * @returns
 *   Value of key if found else `null`.
 */
export async function kvGet(
  userId: number,
  key: string,
): Promise<string | null> {
  const record = await prisma.keyValue.findUnique({
    where: { userId_key: { userId, key } },
  });

  if (!record) return null;

  return record?.isEncrypted ? decrypt(record.value) : record.value;
}
