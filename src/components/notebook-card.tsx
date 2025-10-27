import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotebookWithNotes } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteNotebookButton from "./delete-notebook-button";
import { NotebookIcon } from "lucide-react";

interface NotebookCardProps {
  notebook: NotebookWithNotes;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
        <CardDescription>
          <small>Created {notebook.createdAt.toLocaleDateString()}</small>
        </CardDescription>
        <CardAction>
          <NotebookIcon className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          {notebook.notes.length === 0
            ? "No notes"
            : `${notebook.notes.length} ${notebook.notes.length === 1 ? "note" : "notes"}`}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/notebooks/${notebook.id}`}>
          <Button>View</Button>
        </Link>
        <DeleteNotebookButton notebookId={notebook.id} />
      </CardFooter>
    </Card>
  );
}
