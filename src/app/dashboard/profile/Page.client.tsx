"use client";

import { useState, useRef } from "react";
import AvatarSection from "@/components/profile/AvatarSection";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

export default function ProfileClient({
  initialProfile,
}: {
  initialProfile: any;
}) {
  const [profile, setProfile] = useState(initialProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpdate = (newAvatarUrl: string | null) => {
    setProfile((prev: any) => ({ ...prev, avatar_url: newAvatarUrl }));
  };

  const handleProfileUpdate = (updatedFields: any) => {
    setProfile((prev: any) => ({ ...prev, ...updatedFields }));
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const displayName = profile.full_name
    ? String(profile.full_name).trim().split(" ")[0]
    : "";
  const displayInitial = profile.full_name
    ? profile.full_name[0].toUpperCase()
    : "?";

  return (
    <main className="max-w-7xl mx-auto px-5 my-30 flex flex-col">
      <div className="flex items-center gap-5">
        <AvatarSection
          avatarUrl={profile.avatar_url}
          displayInitial={displayInitial}
          onAvatarClick={handleAvatarClick}
          onAvatarUpdate={handleAvatarUpdate}
          fileInputRef={fileInputRef}
        />

        <h1 className="text-4xl font-semibold">
          Ahoj{displayName ? ", " : ""}
          {displayName}!
        </h1>
      </div>

      <ProfileEditForm
        initialProfile={profile}
        onUpdate={handleProfileUpdate}
      />
    </main>
  );
}
