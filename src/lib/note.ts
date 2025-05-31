/**
 * @module lib/note
 *
 * Service functions for notes
 *
 * Exports:
 *  - createNote(data)
 *  - getNoteByTitle(userId, title)
 *  - getAllUserNotes(userId)
 *  - getUserNoteCount(userId)
 *  - getUserNotes(userId, page, pageSize)
 *  - deleteUserNote(userId, title)
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { CreateNoteInput, NoteDTO } from "@/types/note";
import { noteDTO } from "@/types/note";
import { prisma } from "@/global/prisma";
import { AppError } from "@/lib/error";

/**
 * Creates a new note.
 *
 * @param data
 *   Object consisting of `userId` (number), `title` (string), and `content` (string).
 * @throws
 *   AppError with CONFLICT status code if note with same userId and title exist.
 * @returns
 *   Promise<void>.
 */
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

/**
 * Gets note by title.
 *
 * @param userId
 *   Target user id (number).
 * @param title
 *   Target note's title (string).
 * @throws
 *   AppError with NOT_FOUND if note does not exist.
 * @returns
 *   NoteDTO object to remove sensitive/unnecessary info.
 */
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

/**
 * Gets all user notes.
 *
 * @param userId
 *   Target user id (number).
 * @returns
 *   Array of NoteDTO.
 */
export async function getAllUserNotes(userId: number): Promise<NoteDTO[]> {
  const notes = await prisma.note.findMany({
    where: { userId },
  });

  return notes.map((note) => noteDTO.parse(note));
}

/**
 * Gets number user notes.
 *
 * @param userId
 *   Target user id (number).
 * @returns
 *   Count of user notes.
 */
export async function getUserNoteCount(userId: number): Promise<number> {
  return await prisma.note.count({
    where: { userId },
  });
}

/**
 * Gets user notes pagenated.
 *
 * @param userId
 *   Target user id (number).
 * @param page
 *   Target page number (number).
 * @param pageSize
 *   Number of notes per page (number).
 * @returns
 *   Array of NoteDTO sorted by creation date desc.
 */
export async function getUserNotes(
  userId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<NoteDTO[]> {
  const notes = await prisma.note.findMany({
    where: { userId },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes.map((note) => noteDTO.parse(note));
}

/**
 * Deletes a user note.
 *
 * @param userId
 *   Target user id (number).
 * @param title
 *   Target note title (string).
 * @returns
 *   Promise<void>.
 */
export async function deleteUserNote(
  userId: number,
  title: string,
): Promise<void> {
  await prisma.note.delete({ where: { userId_title: { userId, title } } });
}
