import { User } from "@/generated/prisma";
import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" }),
  discordId: z.bigint().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const userDTO = z.object({
  id: z.bigint(),
  discordId: z.bigint().nullable(),
  username: z.string(),
});

export type UserDTO = z.infer<typeof userDTO>;
