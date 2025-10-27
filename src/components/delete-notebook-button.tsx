"use client";

import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "sonner";
import { deleteNotebook } from "@/actions/notebooks";
import { useRouter } from "next/navigation";

interface DeleteNotebookButtonProps {
  notebookId: string;
}

export default function DeleteNotebookButton({
  notebookId,
}: DeleteNotebookButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  function onOpenChange(open: boolean) {
    setIsOpen(open);
  }

  async function handleDelete() {
    try {
      startLoading();
      const response = await deleteNotebook(notebookId);
      if (response.success) {
        toast.success("Notebook deleted successfully!");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message || "Failed to delete notebook.");
      }
    } catch (error) {
      console.error("Error deleting notebook:", error);
      toast.error("Failed to delete notebook.");
    } finally {
      stopLoading();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="size-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            notebook and all its notes.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose>Cancel</DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Yes, delete notebook"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
