import { Note } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          <small>Created {note.createdAt.toLocaleDateString()}</small>
        </CardDescription>
        <CardAction>
          <FileText className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* <p>
              {notebook.notes.length === 0
                ? "No notes"
                : `${notebook.notes.length} ${notebook.notes.length === 1 ? "note" : "notes"}`}
            </p> */}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/notebooks/${note.notebookId}/notes/${note.id}`}>
          <Button>
            <PencilIcon className="size-4" />
            Edit
          </Button>
        </Link>
        <Button variant="destructive">
          <Trash2 className="size-4" />
          Delete
        </Button>
        {/* <DeleteNotebookButton notebookId={notebook.id} /> */}
      </CardFooter>
    </Card>
  );
}
