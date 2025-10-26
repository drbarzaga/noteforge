"use server";

import { auth } from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    console.log("Error signing in:", error);
    return {
      success: false,
      message: (error as Error).message || "Failed to sign in",
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    console.log("Error signing up:", error);
    return {
      success: false,
      message: (error as Error).message || "Failed to sign up",
    };
  }
};

export const forgetPassword = async (email: string) => {
  try {
    await auth.api.forgetPassword({
      body: {
        email,
      },
    });

    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    console.log("Error sending password reset email:", error);
    return {
      success: false,
      message:
        (error as Error).message || "Failed to send password reset email",
    };
  }
};
