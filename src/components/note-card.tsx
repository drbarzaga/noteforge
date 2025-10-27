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

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          Created {note.createdAt.toLocaleDateString()}
        </CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        {/* <p>
              {notebook.notes.length === 0
                ? "No notes"
                : `${notebook.notes.length} ${notebook.notes.length === 1 ? "note" : "notes"}`}
            </p> */}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {/* <Link href={`/notebooks/${notebook.id}`}>
              <Button>View</Button>
            </Link>
            <DeleteNotebookButton notebookId={notebook.id} /> */}
      </CardFooter>
    </Card>
  );
}
