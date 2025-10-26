import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import UserVerificationEmail from "@/components/emails/user-verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const { data, error } = await resend.emails.send({
        from: "NoteForge <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: UserVerificationEmail({
          userName: user.name,
          verificationUrl: url,
        }),
      });
    },
    sendOnSignUp: true,
  },
  plugins: [nextCookies()],
});
