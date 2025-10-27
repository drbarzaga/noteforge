import { Notebook } from "@/types";
import React from "react";

interface NotebooksProps {
  notebooks: Notebook[];
}

export default function Notebooks({ notebooks }: NotebooksProps) {
  return (
    <div>
      Notebooks
      <pre>{JSON.stringify(notebooks, null, 2)}</pre>
    </div>
  );
}
