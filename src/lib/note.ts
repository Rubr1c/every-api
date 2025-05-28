import type { CreateNoteInput, NoteDTO } from "@/types/note";
import { noteDTO } from "@/types/note";
import { prisma } from "@/prisma";

export async function createNote(data: CreateNoteInput): Promise<void> {
  await prisma.note.create({
    data: { ...data },
  });
}

export async function getNoteByTitle(
  userId: number,
  title: string,
): Promise<NoteDTO | null> {
  const note = await prisma.note.findUnique({
    where: { userId_title: { userId, title } },
  });

  return note;
}

export async function getAllUserNotes(userId: number): Promise<NoteDTO[]> {
  const notes = await prisma.note.findMany({
    where: { userId },
  });

  return notes.map((note) => noteDTO.parse(note));
}

export async function deleteUserNote(
  userId: number,
  title: string,
): Promise<void> {
  await prisma.note.delete({ where: { userId_title: { userId, title } } });
}

//TODO: edit?
