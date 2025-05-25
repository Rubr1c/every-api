import { prisma } from "../prisma";

export async function kvSet(
  userId: number,
  key: string,
  value: string,
): Promise<void> {
  await prisma.keyValue.upsert({
    where: { userId_key: { userId, key } },
    create: { userId, key, value },
    update: { value },
  });
}

export async function kvGet(
  userId: number,
  key: string,
): Promise<string | null> {
  const record = await prisma.keyValue.findUnique({
    where: { userId_key: { userId, key } },
  });
  return record?.value ?? null;
}
