import { prisma } from "@/prisma";
import type { CreateUserInput, UserDTO } from "@/types/user";
import { userDTO } from "@/types/user";
import { AppError } from "./error";

export async function createUser(data: CreateUserInput): Promise<void> {
  await prisma.user.create({
    data: {
      ...data,
    },
  });
}

export async function getUserById(id: bigint): Promise<UserDTO> {
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
