/**
 * @module ai/client
 *
 * Client for ai model
 * 
 *
 * Exports:
 *  - getGeminiModel(model)
 *
 * supports only google for now
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { google } from "@ai-sdk/google";

/**
 * Removes any (string & {}) from a type.
 */
type Strict<T> = T extends string ? (string extends T ? never : T) : never;

/**
 * Extract unexpored GoogleModel type from vercel ai sdk.
 */
type GoogleModel = Strict<Parameters<typeof google>[0]>;

/**
 * Returns gemini model.
 *
 * @param model
 *   Gemini model requested.
 * @returns
 *   The model with settings from vercel ai sdk.
 */
export function getGeminiModel(model: GoogleModel = "gemini-2.0-flash") {
  //TODO: Add more options
  return google(model);
}
