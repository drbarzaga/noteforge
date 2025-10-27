import React from "react";
import PageWrapper from "@/components/page-wrapper";
import { getNotebookById } from "@/actions/notebooks";
import NoteCard from "@/components/note-card";
import NotesEmptyState from "@/components/notes-empty-state";
import CreateNoteButton from "@/components/create-note-button";

type Params = Promise<{ notebookId: string }>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = await params;
  const notebook = await getNotebookById(notebookId);

  const breadcrumbs = [{ label: "Notebooks", href: "/notebooks" }];

  if (notebook.success && notebook.notebook) {
    breadcrumbs.push({
      label: notebook.notebook.name,
      href: `/notebooks/${notebookId}`,
    });
  }

  return (
    <PageWrapper
      title={notebook.notebook?.name}
      breadcrumbs={breadcrumbs}
      renderActions={<CreateNoteButton />}
    >
      {notebook.success && notebook.notebook ? (
        notebook.notebook.notes.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notebook.notebook.notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-96 h-full">
            <NotesEmptyState />
          </div>
        )
      ) : (
        <div>Failed to load notes for this notebook.</div>
      )}
    </PageWrapper>
  );
}
