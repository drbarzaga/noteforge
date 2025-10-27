import { notebooks, notes } from "./db/schema";

export type Notebook = typeof notebooks.$inferSelect;

export type NotebookWithNotes = typeof notebooks.$inferSelect & {
  notes: Note[];
};
export type InsertNotebook = typeof notebooks.$inferInsert;

export type Note = typeof notes.$inferSelect;

export type InsertNote = typeof notes.$inferInsert;
