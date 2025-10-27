"use server";

import { db } from "@/db/drizzle";
import { notebooks } from "@/db/schema/notebooks";
import { auth } from "@/lib/auth";
import { InsertNotebook } from "@/types";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

// Function to create a new notebook
export const createNotebook = async (values: InsertNotebook) => {
  try {
    await db.insert(notebooks).values(values);
    return { success: true, message: "Notebook created successfully" };
  } catch (error) {
    console.log("Error creating notebook:", error);
    return {
      success: false,
      message: (error as Error).message || "Failed to create notebook",
    };
  }
};

// Function to get all notebooks for the authenticated user
export const getNotebooks = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user.id;
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const notebooksList = await db
      .select()
      .from(notebooks)
      .where(eq(notebooks.userId, userId))
      .orderBy(desc(notebooks.updatedAt));

    return {
      success: true,
      notebooks: notebooksList,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to fetch notebooks",
    };
  }
};

// Function to get a specific notebook by its ID
export const getNotebookById = async (notebookId: string) => {
  try {
    const notebook = await db
      .select()
      .from(notebooks)
      .where(eq(notebooks.id, notebookId))
      .limit(1);

    if (!notebook) {
      return {
        success: false,
        message: "Notebook not found",
      };
    }

    return {
      success: true,
      notebook,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to fetch notebook",
    };
  }
};

// Function to update a notebook by its ID
export const updateNotebook = async (
  notebookId: string,
  values: Partial<InsertNotebook>
) => {
  try {
    await db.update(notebooks).set(values).where(eq(notebooks.id, notebookId));

    return {
      success: true,
      message: "Notebook updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to update notebook",
    };
  }
};

// Function to delete a notebook by its ID
export const deleteNotebook = async (notebookId: string) => {
  try {
    await db.delete(notebooks).where(eq(notebooks.id, notebookId));

    return {
      success: true,
      message: "Notebook deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Failed to delete notebook",
    };
  }
};
