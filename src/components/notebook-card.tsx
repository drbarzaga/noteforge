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
import { Trash2 } from "lucide-react";

interface NotebookCardProps {
  notebook: NotebookWithNotes;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
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
        <Button variant="destructive">
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
