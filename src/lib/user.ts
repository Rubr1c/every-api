import { prisma } from "@/prisma";
import type { CreateUserInput, UserDTO } from "@/types/user";
import { userDTO } from "@/types/user";
import { AppError } from "./error";

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

export async function incrementUserXp(id: bigint): Promise<void> {
  await prisma.user.update({
    where: {
      discordId: id,
    },
    data: {
      xp: { increment: 1 },
    },
  });
}
