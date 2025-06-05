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

/**
 * Start a single chat with model.
 *
 * @param data
 *   message, stream, userId, and discordId wanted 
 * @returns
 *   Response text or stream.
 */
export async function chat({
  message,
  stream,
  userId,
  discordId,
}: {
  //TODO: make type
  message: string;
  stream: boolean;
  userId?: number;
  discordId?: string;
}): Promise<ReadableStream<string> | string> {
  if (!discordId) {
    //TODO: handle error
    return "err";
  }

  const userInfo = userId ? `User ID: ${userId}` : `Discord ID: ${discordId}`;
  const fullPrompt = `${userInfo}\n\n${message}`;

  if (stream) {
    const res = await streamText({
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
