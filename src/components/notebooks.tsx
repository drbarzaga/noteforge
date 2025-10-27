import { Notebook, NotebookWithNotes } from "@/types";
import React from "react";
import NotebookCard from "./notebook-card";

interface NotebooksProps {
  notebooks: Notebook[];
}

export default function Notebooks({ notebooks }: NotebooksProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notebooks.map((notebook) => (
        <NotebookCard
          key={notebook.id}
          notebook={notebook as NotebookWithNotes}
        />
      ))}
    </div>
  );
}
