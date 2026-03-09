"use client";

import { LuPencil } from "react-icons/lu";
import { useState, useTransition } from "react";
import { uploadAvatar, removeAvatar } from "@/app/dashboard/profile/actions";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function AvatarSection({
  avatarUrl,
  displayInitial,
  onAvatarClick,
  onAvatarUpdate,
  fileInputRef,
}) {
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("oldAvatarUrl", avatarUrl || "");

      startTransition(async () => {
        const result = await uploadAvatar(formData);

        if (result.error) {
          toast.error("Chyba při nahrávání avataru: " + result.error);
        } else {
          onAvatarUpdate(result.avatarUrl);
          toast.success("Avatar byl úspěšně nahrán!");
        }
        setUploading(false);
      });
    } catch (error) {
      toast.error("Chyba při nahrávání avataru: " + error.message);
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!avatarUrl) return;

    setUploading(true);

    try {
      startTransition(async () => {
        const result = await removeAvatar();

        if (result.error) {
          toast.error("Chyba při odstraňování avataru: " + result.error);
        } else {
          onAvatarUpdate(null);
          toast.success("Avatar byl úspěšně odstraněn!");
        }
        setUploading(false);
      });
    } catch (error) {
      toast.error("Chyba při odstraňování avataru: " + error.message);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        id="gabarito-wrapper"
        className="relative rounded-full cursor-pointer group"
        onClick={onAvatarClick}
      >
        <div
          id="gabarito"
          className="w-15 h-15 rounded-full content-center text-center font-bold text-3xl overflow-hidden transition-all duration-300 bg-funweek text-white"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={() => onAvatarUpdate(null)}
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full">
              {displayInitial}
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-black text-white bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <LuPencil />
        </div>
      </div>

      <input
        ref={fileInputRef}
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading || isPending}
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
