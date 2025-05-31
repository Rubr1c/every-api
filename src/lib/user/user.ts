/**
 * @module lib/user/user
 *
 * Service for main user functions.
 *
 * Exports:
 *  - createUser(data)
 *  - getUserById(id)
 *  - getUserByDiscordId(id)
 *
 * Uses number for id and bigint for discordId.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { prisma } from "@/global/prisma";
import type { CreateUserInput, UserDTO } from "@/types/user";
import { userDTO } from "@/types/user";
import { AppError } from "@/lib/error";

/**
 * Creates a new user.
 *
 * @param data
 *   Object consisting of `username` (string) and `discordId` (bigint, optional).
 * @throws
 *   AppError with CONFLICT status code if user with discordId already exists.
 * @returns
 *   Promise<void>.
 */
export async function createUser(data: CreateUserInput): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        ...data,
      },
    });
  } catch (error: any) {
    // Check if it's a Prisma unique constraint violation
    if (error.code === "P2002" && error.meta?.target?.includes("discordId")) {
      throw new AppError(
        "A user with this Discord ID already exists",
        "CONFLICT",
      );
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Get a user by id.
 *
 * @param id
 *   Target user id (number).
 * @throws
 *   AppError with NOT_FOUND status code if user does not exist.
 * @returns
 *   UserDTO object to remove sensitive/unnecessary info.
 */
export async function getUserById(id: number): Promise<UserDTO> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new AppError("User not found", "NOT_FOUND");
  }

  return userDTO.parse(user);
}

/**
 * Get a user by discordId.
 *
 * @param id
 *   Target user discordId (bigint).
 * @throws
 *   AppError with NOT_FOUND status code if user does not exist.
 * @returns
 *   UserDTO object to remove sensitive info.
 */
export async function getUserByDiscordId(id: bigint): Promise<UserDTO> {
  const user = await prisma.user.findUnique({
    where: {
      discordId: id,
    },
  });

  if (!user) {
    throw new AppError("User not found", "NOT_FOUND");
  }

  return userDTO.parse(user);
}

