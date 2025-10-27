"use server";

import { db } from "@/db/drizzle";
import { notes } from "@/db/schema";
import { InsertNote } from "@/types";
import { eq } from "drizzle-orm";

// Function to create a new note
export const createNote = async (values: InsertNote) => {
  try {
    await db.insert(notes).values(values);
    return { success: true, message: "Note created successfully" };
  } catch (error) {
    console.log("Error creating note:", error);
    return {
      success: false,
      message: (error as Error).message || "Failed to create note",
    };
  }
};

// Function to get a specific note by its ID
export const getNoteById = async (noteId: string) => {
  try {
    const note = await db
      .select()
      .from(notes)
      .where(eq(notes.id, noteId))
      .limit(1)
      .then((res) => res[0]);

    if (!note) {
      return {
        success: false,
        message: "Note not found",
      };
    }

    return {
      success: true,
      note,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to fetch note",
    };
  }
};

// Function to update a note by its ID
export const updateNote = async (
  noteId: string,
  values: Partial<InsertNote>
) => {
  try {
    await db.update(notes).set(values).where(eq(notes.id, noteId));

    return {
      success: true,
      message: "Note updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to update note",
    };
  }
};

// Function to delete a note by its ID
export const deleteNote = async (noteId: string) => {
  try {
    await db.delete(notes).where(eq(notes.id, noteId));

    return {
      success: true,
      message: "Note deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to delete note",
    };
  }
};
