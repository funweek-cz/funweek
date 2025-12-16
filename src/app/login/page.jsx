import React from "react";
import { createClient } from "@/lib/supabase/server";
import LoginPageClient from "@/app/login/Page.client";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard/profile");
  }

  return <LoginPageClient />;
};

export default LoginPage;
