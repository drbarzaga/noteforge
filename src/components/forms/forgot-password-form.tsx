"use client";

import Link from "next/link";
import { Logo } from "../logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoading } from "@/hooks/useLoading";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z
    .email("Email must be a valid email address.")
    .min(2, "Email must be at least 2 characters.")
    .max(100, "Email must be at most 100 characters."),
});

export default function ForgotPasswordForm() {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startLoading();
      const { email } = values;
      const { error } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });

      if (!error) {
        toast.success("Please check your email for a password reset link");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Failed to send password reset link:", error);
    } finally {
      stopLoading();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <Logo className="size-10" />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Recover Password
            </h1>
            <p className="text-sm">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Send Reset Link"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              We&#39;ll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Log in</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
