import { prisma } from "@/prisma"
import type { LevelUpDTO } from "@/types/user";
import { hasLeveledUp } from "@/utils/level.levelup";

export async function incrementUserLevel(id: bigint): Promise<number> {
  const user = await prisma.user.update({
    where: {
      discordId: id,
    },
    data: {
      level: { increment: 1 },
    },
  });

  return user.level;
}

export async function incrementUserXp(id: bigint): Promise<LevelUpDTO> {
  const user = await prisma.user.update({
    where: {
      discordId: id,
    },
    data: {
      xp: { increment: 1 },
    },
  });

  if (hasLeveledUp(user.xp, user.level)) {
    return { leveledup: true, level: await incrementUserLevel(id) };
  }

  return { leveledup: false };
}

export async function dev_addXpToUser(
  id: bigint,
  xpCount: number,
): Promise<LevelUpDTO> {
  const user = await prisma.user.update({
    where: {
      discordId: id,
    },
    data: {
      xp: { increment: xpCount },
    },
  });

  if (hasLeveledUp(user.xp, user.level)) {
    return { leveledup: true, level: await incrementUserLevel(id) };
  }

  return { leveledup: false };
}
