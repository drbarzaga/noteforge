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
import { EyeIcon, NotebookIcon, PencilIcon } from "lucide-react";

interface NotebookCardProps {
  notebook: NotebookWithNotes;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <NotebookIcon className="size-4 mr-2" />
          {notebook.name}
        </CardTitle>
        <CardDescription>
          <small>Created {notebook.createdAt.toLocaleDateString()}</small>
        </CardDescription>
        <CardAction>
          <Button variant="ghost">
            <PencilIcon className="size-4" />
          </Button>
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
          <Button>
            <EyeIcon className="size-4" />
            View
          </Button>
        </Link>
        <DeleteNotebookButton notebookId={notebook.id} />
      </CardFooter>
    </Card>
  );
}
