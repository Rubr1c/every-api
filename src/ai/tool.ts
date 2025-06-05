/**
 * @module ai/tool
 *
 * Tools for the models
 *
 *
 * Exports:
 *  - tools
 *
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { z } from "zod";
import { tool } from "ai";
import { getUserByDiscordId, getUserById } from "@/lib/user/user";

export const tools = {
  userDetails: tool({
    description: "fetch user details",
    parameters: z.object({
      userId: z
        .number()
        .optional()
        .describe("user id for the user requesting if exists"),
      discordId: z
        .string()
        .optional()
        .describe("discord id for the user requesting if exists"),
    }),
    execute: async ({ userId, discordId }) => {
      if (userId) {
        const user = await getUserById(userId);
        return {
          ...user,
          discordId: user.discordId?.toString(),
          xp: user.xp.toString(),
        };
      } else if (discordId) {
        const user = await getUserByDiscordId(BigInt(discordId));
        return {
          ...user,
          discordId: user.discordId?.toString(),
          xp: user.xp.toString(),
        };
      }

      return {
        error: "no provided user or discord id",
      };
    },
  }),
};
