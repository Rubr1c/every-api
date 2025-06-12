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

import { z } from 'zod';
import { tool } from 'ai';
import { getUserByDiscordId, getUserById } from '@/lib/db/user/user';
import { userIdSchema } from '@/types/ai';

export const tools = {
  userDetails: tool({
    description: 'fetch user details',
    parameters: userIdSchema,
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
        error: 'no provided user or discord id',
      };
    },
  }),
};
