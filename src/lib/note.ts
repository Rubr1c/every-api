import type { CreateNoteInput, NoteDTO } from "@/types/note";
import { noteDTO } from "@/types/note";
import { prisma } from "@/prisma";
import { AppError } from "@/lib/error";

export async function createNote(data: CreateNoteInput): Promise<void> {
  try {
    await prisma.note.create({
      data: { ...data },
    });
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("title")) {
      throw new AppError("A note with this title already exists", "CONFLICT");
    }

    throw error;
  }
}

export async function getNoteByTitle(
  userId: number,
  title: string,
): Promise<NoteDTO | null> {
  const note = await prisma.note.findUnique({
    where: { userId_title: { userId, title } },
  });

  if (!note) {
    throw new AppError("Note not found", "NOT_FOUND");
  }

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
