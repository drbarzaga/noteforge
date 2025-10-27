import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { NotebookText } from "lucide-react";
import CreateNoteButton from "./create-note-button";

interface NotesEmptyStateProps {
  notebookId: string;
}

export default function NotesEmptyState({ notebookId }: NotesEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotebookText className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No notes found</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any notes yet in this notebook. Create a new note
          to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateNoteButton notebookId={notebookId} />
      </EmptyContent>
    </Empty>
  );
}
