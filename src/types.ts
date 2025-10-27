import { notebooks, notes } from "./db/schema/notebooks";

export type Notebook = typeof notebooks.$inferSelect;

export type InsertNotebook = typeof notebooks.$inferInsert;

export type Note = typeof notes.$inferSelect;
