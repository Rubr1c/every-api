import { prisma } from "@/prisma";
import type { CreateUserInput, UserDTO } from "@/types/user";
import { userDTO } from "@/types/user";

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
            id
        }
    });

    return userDTO.parse(user); 
}
