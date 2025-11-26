"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Slide, toast, ToastContainer } from "react-toastify";

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function AvatarControls({
  uid,
  avatarUrl,
  onUpload,
  onRemove,
  fileInputRef,
}) {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!uid) {
        throw new Error(
          "User ID (uid) is missing. Cannot proceed with upload.",
        );
      }

      const file = event.target.files[0];

      if (!file) {
        setUploading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}-${Date.now()}-${generateRandomString(8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const newAvatarUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", uid);

      if (updateError) {
        throw updateError;
      }

      if (avatarUrl) {
        try {
          const oldFileName = avatarUrl.substring(
            avatarUrl.lastIndexOf("/") + 1,
          );
          if (oldFileName && oldFileName.length > 0) {
            await supabase.storage.from("avatars").remove([oldFileName]);
          }
        } catch (e) {}
      }

      onUpload(newAvatarUrl);
      toast.success("Avatar byl úspěšně nahrán!");
    } catch (error) {
      toast.error("Chyba při nahrávání avataru: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={fileInputRef}
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
}
