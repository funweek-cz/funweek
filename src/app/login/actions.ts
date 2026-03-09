"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function sendOtpEmail(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function verifyOtpCode(email: string, token: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email",
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard/profile");
}
