import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { NotebookIcon } from "lucide-react";
import CreateNotebookButton from "./create-notebook-button";

export default function NotebookEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <NotebookIcon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No notebooks found</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any notebooks yet. Create a new notebook to get
          started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateNotebookButton />
      </EmptyContent>
    </Empty>
  );
}
