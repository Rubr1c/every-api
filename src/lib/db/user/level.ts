/**
 * @module lib/user/level
 *
 * Service functions to update user level.
 * 
 *
 * Exports:
 *  - incrementUserLevel(id)
 *  - incrementUserXp(id)
 *  - dev_addXpToUser(id, xpCount)
 *  - dev_setLevel(id, level)
 *  - dev_setXp(id, xp)
 *
 * Uses bigint for xp and number for level.
 * functions marked with dev usally used for admin/dev users.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { prisma } from "@/global/prisma";
import type { LevelUpDTO } from "@/types/user";
import { hasLeveledUp, levelFromXp, xpForLevel } from "@/lib/utils/levels";

/**
 * Increments user level.
 *
 * @param id
 *   Target user discordId (bigint).
 * @returns
 *   New incremented level (number).
 */
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

/**
 * Increments user xp.
 *
 * @param id
 *   Target user discordId (bigint).
 * @returns
 *   An object that contains if the user has leveled up and to what level.
 */
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

/**
 * Adds xp amount to user.
 *
 * @param id
 *   Target user discordId (bigint).
 * @param xpCount
 *   Amount of xp to be added (bigint),
 * @returns
 *   An object that contains if the user has leveled up and to what level.
 */
export async function dev_addXpToUser(
  id: bigint,
  xpCount: bigint,
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

/**
 * Sets level for user.
 *
 * @param id
 *   Target user discordId (bigint).
 * @param level
 *   Level to set user at (number).
 * @returns
 *   Promise<void>.
 */
export async function dev_setLevel(id: bigint, level: number): Promise<void> {
  await prisma.user.update({
    where: {
      discordId: id,
    },
    data: {
      level,
      xp: xpForLevel(level),
    },
  });
}

/**
 * Sets xp for user.
 *
 * @param id
 *   Target user discordId (bigint).
 * @param xp
 *   Xp to set user at (bigint).
 * @returns
 *   Promise<void>.
 */
export async function dev_setXp(id: bigint, xp: bigint): Promise<void> {
  await prisma.user.update({
    where: {
      discordId: id,
    },
    data: {
      xp,
      level: levelFromXp(xp),
    },
  });
}
