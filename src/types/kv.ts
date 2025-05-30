import { z } from "zod";

export const storeKvSchema = z.object({
  userId: z.number(),
  key: z.string(),
  value: z.string(),
  isEncrypted: z.boolean(),
});

export type StoreKvInput = z.infer<typeof storeKvSchema>;
