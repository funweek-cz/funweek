"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState, useCallback, useRef } from "react";
import AvatarControls from "@/components/AvatarControls";
import ProfileEditForm from "@/components/ProfileEditForm";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState("?");
  const router = useRouter();
  const fileInputRef = useRef(null);

  const scrolled = false;

  const getProfile = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      router.push("/login");
      setLoading(false);
      return;
    }

    setUserId(user.id);

    let { data, error } = await supabase
      .from("profiles")
      .select(
        `id, full_name, email, avatar_url, visible_staff, instagram, linkedin, discord, visible_email, thumbnail_image, department, role`,
      )
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error loading profile:", error.message);
    }

    if (data) {
      setProfile({ ...data, email: user.email });
      const currentFullName = data.full_name || "";
      setFullName(currentFullName);
      setAvatarUrl(data.avatar_url);

      if (currentFullName) {
        const initialLetter = currentFullName[0].toUpperCase();
        setInitial(initialLetter);
      } else {
        setInitial("?");
      }
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleAvatarUpload = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl);
    setProfile((prev) => (prev ? { ...prev, avatar_url: newAvatarUrl } : null));
  };

  const handleAvatarRemove = () => {
    setAvatarUrl(null);
    setProfile((prev) => (prev ? { ...prev, avatar_url: null } : null));
  };

  const handleProfileSave = (updatedFields) => {
    if (updatedFields.full_name !== undefined) {
      const newFullName = updatedFields.full_name || "";
      setFullName(newFullName);
      if (newFullName) {
        const initialLetter = newFullName[0].toUpperCase();
        setInitial(initialLetter);
      } else {
        setInitial("?");
      }
    }
    setProfile((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading || !profile) {
    return (
      <main className="w-full px-10 md:px-50 mt-30 flex flex-col justify-center items-center">
        <p>Načítání profilu...</p>
      </main>
    );
  }

  const displayName = fullName ? String(fullName).trim().split(" ")[0] : "";
  const displayInitial = initial;

  return (
    <main className="max-w-7xl mx-auto px-5 my-30 flex flex-col">
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center">
          <div
            id="gabarito-wrapper"
            className="relative rounded-full cursor-pointer group"
            onClick={handleAvatarClick}
          >
            <div
              id="gabarito"
              className={`w-15 h-15 rounded-full content-center text-center font-bold text-3xl overflow-hidden transition-all duration-300 ${
                scrolled
                  ? "bg-funweek text-white border-1 border-white"
                  : "bg-funweek text-white"
              }`}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={() => setAvatarUrl(null)}
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full">
                  {displayInitial}
                </span>
              )}
            </div>

            <div className="absolute inset-0 bg-black text-white bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil />
            </div>
          </div>

          {userId && (
            <AvatarControls
              uid={userId}
              avatarUrl={avatarUrl}
              onUpload={handleAvatarUpload}
              onRemove={handleAvatarRemove}
              fileInputRef={fileInputRef}
            />
          )}
        </div>

        <h1 className="text-4xl font-bold">
          Ahoj{displayName ? ", " : ""}
          {displayName}!
        </h1>
      </div>

      <ProfileEditForm initialProfile={profile} onSave={handleProfileSave} />
    </main>
  );
}
