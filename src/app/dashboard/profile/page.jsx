import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileClient from "./Page.client";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `id, full_name, email, avatar_url, visible_staff, instagram, linkedin, discord, visible_email, thumbnail_image, department, role`,
    )
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error loading profile:", error.message);
    return (
      <main className="w-full px-10 md:px-50 mt-30 flex flex-col justify-center items-center">
        <p>Chyba při načítání profilu</p>
      </main>
    );
  }

  const profileWithEmail = { ...profile, email: user.email };

  return <ProfileClient initialProfile={profileWithEmail} />;
}
