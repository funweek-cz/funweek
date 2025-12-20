"use client";

import { useState, useTransition } from "react";
import {
  uploadThumbnail,
  removeThumbnail,
} from "@/app/dashboard/profile/actions";
import { LuLoaderCircle, LuTrash2, LuUpload } from "react-icons/lu";
import Image from "next/image";

export default function ThumbnailControls({
  thumbnailUrl,
  onThumbnailUpdate,
  fileInputRef,
}) {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("oldThumbnailUrl", thumbnailUrl || "");

      startTransition(async () => {
        const result = await uploadThumbnail(formData);

        if (result.error) {
          console.error("Chyba při nahrávání thumbnailu:", result.error);
        } else {
          onThumbnailUpdate(result.thumbnailUrl);
        }

        setUploading(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      });
    } catch (error) {
      console.error("Chyba při nahrávání thumbnailu:", error.message);
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!thumbnailUrl) return;

    setRemoving(true);

    try {
      startTransition(async () => {
        const result = await removeThumbnail();

        if (result.error) {
          console.error("Chyba při odstraňování thumbnailu:", result.error);
        } else {
          onThumbnailUpdate(null);
        }

        setRemoving(false);
      });
    } catch (error) {
      console.error("Chyba při odstraňování thumbnailu:", error.message);
      setRemoving(false);
    }
  };

  const isDisabled = uploading || removing || isPending;

  return (
    <div className="flex items-center space-x-4">
      <input
        ref={fileInputRef}
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="thumbnail-upload"
        accept="image/*"
        onChange={handleUpload}
        disabled={isDisabled}
      />

      <div className="w-20 h-30 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-300 flex-shrink-0">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="Thumbnail"
            width={80}
            height={120}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/80x120/cccccc/333333?text=Thumb+Err";
            }}
          />
        ) : (
          <div className="w-8 h-12 text-gray-400" />
        )}
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
            isDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-funweek text-white hover:bg-funweek/80"
          }`}
          disabled={isDisabled}
        >
          {uploading ? (
            <>
              <LuLoaderCircle className="w-4 h-4 mr-2 animate-spin" />{" "}
              Nahrávám...
            </>
          ) : (
            <>
              <LuUpload className="w-4 h-4 mr-2" />{" "}
              {thumbnailUrl ? "Změnit obrázek" : "Nahrát obrázek"}
            </>
          )}
        </button>

        {thumbnailUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
              removing
                ? "bg-red-200 text-red-500 cursor-not-allowed"
                : "bg-white text-red-600 border-red-600 hover:bg-red-50"
            }`}
            disabled={isDisabled}
          >
            {removing ? (
              <>
                <LuLoaderCircle className="w-4 h-4 mr-2 animate-spin" /> Mažu...
              </>
            ) : (
              <>
                <LuTrash2 className="w-4 h-4 mr-2" /> Odstranit
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
