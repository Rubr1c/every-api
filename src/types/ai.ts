import { z } from "zod";

export const userIdSchema = z
  .object({
    userId: z
      .number()
      .optional()
      .describe("user id for the user requesting if exists"),
    discordId: z
      .string()
      .optional()
      .describe("discord id for the user requesting if exists"),
  })
  .refine((data) => data.userId !== undefined || data.discordId !== undefined, {
    message: "Either userId or discordId must be provided.",
    path: ["userId"],
  });

export const singleMessageSchema = z
  .object({
    message: z.string(),
    stream: z.boolean(),
  })
  .and(userIdSchema);

export type SingleMessage = z.infer<typeof singleMessageSchema>;
