import { z } from "zod";

export const createNoteSchema = z.object({
  userId: z.number(),
  title: z.string(),
  content: z.string(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export const noteDTO = z.object({
  title: z.string(),
  content: z.string(),
});

export type NoteDTO = z.infer<typeof noteDTO>;
