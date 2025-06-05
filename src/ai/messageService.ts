/**
 * @module ai/messageService
 *
 * Chat function for messages
 *
 *
 * Exports:
 *  - chat
 *
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { generateText, streamText } from "ai";
import { getGeminiModel } from "./client";
import { tools } from "./tool";
import { DEFAULT_SYSTEM } from "./prompt";
import { SingleMessage, singleMessageSchema } from "@/types/ai";

/**
 * Start a single message with model.
 *
 * @param data
 *   message, stream, (userId or discordId) wanted
 * @returns
 *   Response text or stream.
 */
export async function msg(
  data: SingleMessage
): Promise<ReadableStream<string> | string> {
  const req = singleMessageSchema.parse(data);

  const userInfo = req.userId
    ? `User ID: ${req.userId}`
    : `Discord ID: ${req.discordId}`;
  const fullPrompt = `${userInfo}\n\n${msg}`;

  if (req.stream) {
    const res = streamText({
      system: DEFAULT_SYSTEM,
      model: getGeminiModel(),
      prompt: fullPrompt,
      tools: tools,
      maxSteps: 4,
    });

    return res.textStream;
  } else {
    const res = await generateText({
      system: DEFAULT_SYSTEM,
      model: getGeminiModel(),
      prompt: fullPrompt,
      tools: tools,
      maxSteps: 4,
    });

    return res.text;
  }
}
