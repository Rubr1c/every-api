import type { StoreKvInput } from "@/types/kv";
import { prisma } from "../prisma";
import { decrypt, encrypt } from "./encryption";

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
