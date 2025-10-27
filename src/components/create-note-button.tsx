"use client";

import { useState } from "react";

import { NotebookText } from "lucide-react";
import { Button } from "./ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { createNote } from "@/actions/notes";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z
    .string("Note title is required.")
    .min(2, "Note title must be at least 2 characters long")
    .max(50, "Note title must be at most 50 characters long"),
});

interface CreateNoteButtonProps {
  notebookId: string;
}

export default function CreateNoteButton({
  notebookId,
}: CreateNoteButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startLoading();
      const response = await createNote({
        ...values,
        content: {},
        notebookId: notebookId as string,
      });

      if (response.success) {
        toast.success("Note created successfully!");
        form.reset();
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message || "Failed to create note.");
      }
    } catch (error) {
      console.log("Error creating note:", error);
      toast.error((error as Error).message || "Failed to create note.");
    } finally {
      stopLoading();
    }
  }

  function onOpenChange(open: boolean) {
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <NotebookText className="ml-2 h-4 w-4" />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>
            Enter the details below to create a new note.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Create Note"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
