"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { NotebookPen } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "sonner";
import ButtonLoading from "./button-loading";
import { createNotebook } from "@/actions/notebooks";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string("Notebook name is required.")
    .min(2, "Notebook name must be at least 2 characters long")
    .max(50, "Notebook name must be at most 50 characters long"),
});

export default function CreateNotebookButton() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startLoading();

      const userId = await (await authClient.getSession()).data?.user.id;
      if (!userId) {
        toast.error("You must be logged in to create a notebook.");
        return;
      }

      const response = await createNotebook({
        ...values,
        userId,
      });
      if (response.success) {
        toast.success("Notebook created successfully!");
        form.reset();
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message || "Failed to create notebook.");
      }
    } catch (error) {
      console.log("Error creating notebook:", error);
      toast.error((error as Error).message || "Failed to create notebook.");
    } finally {
      stopLoading();
    }
  }

  function onOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <NotebookPen className="ml-2 h-4 w-4" />
          Create Notebook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new notebook</DialogTitle>
          <DialogDescription>
            Enter the details below to create a new notebook.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Notebook" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your new notebook.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <ButtonLoading /> : "Create Notebook"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
