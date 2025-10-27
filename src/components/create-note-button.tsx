import { NotebookText } from "lucide-react";
import { Button } from "./ui/button";

export default function CreateNoteButton() {
  return (
    <Button>
      <NotebookText className="ml-2 h-4 w-4" />
      Create Note
    </Button>
  );
}
