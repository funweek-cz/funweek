"use client";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import ThumbnailControls from "./ThumbnailControls";

export default function ProfileEditForm({ initialProfile, onSave }) {
  const departmentParts = initialProfile.department
    ? initialProfile.department.split(";#")
    : ["", "#000000"];

  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialProfile.thumbnail_image || "",
  );

  const [formData, setFormData] = useState({
    full_name: initialProfile.full_name || "",
    instagram: initialProfile.instagram || "",
    linkedin: initialProfile.linkedin || "",
    discord: initialProfile.discord || "",
    visible_email: initialProfile.visible_email || "",
    role: initialProfile.role || "",
    departmentName: departmentParts[0],
    departmentColor: departmentParts[1]
      ? `#${departmentParts[1].replace("#", "")}`
      : "#000000",
  });
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const thumbnailInputRef = useRef(null);

  const isStaff = initialProfile.visible_staff;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailUpload = (newUrl) => {
    setThumbnailUrl(newUrl);
    onSave({ ...formData, thumbnail_image: newUrl });
  };

  const handleThumbnailRemove = () => {
    setThumbnailUrl(null);
    onSave({ ...formData, thumbnail_image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updates = {
        full_name: formData.full_name,
        instagram: formData.instagram || null,
        linkedin: formData.linkedin || null,
        discord: formData.discord || null,
        visible_email: formData.visible_email || null,
        id: initialProfile.id,
        visible_staff: isStaff,
      };

      if (isStaff) {
        updates.thumbnail_image = thumbnailUrl || null;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", initialProfile.id);

      if (updateError) {
        const msg = updateError.message || String(updateError);
        console.error("Chyba při aktualizaci profilu:", msg);
        setError("Nepodařilo se aktualizovat profil. " + msg);
        setLoading(false);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        ...updates,
      }));

      onSave({ ...updates, thumbnail_image: thumbnailUrl || null });
    } catch (updateError) {
      console.error("Chyba při aktualizaci profilu:", updateError.message);
      setError("Nepodařilo se aktualizovat profil. " + updateError.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 rounded mt-1 focus:ring-funweek focus:border-funweek";
  const labelClass = "block text-sm font-medium text-gray-700 mt-3";
  const disabledClass = "bg-gray-100 cursor-not-allowed";

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h2 className="text-3xl font-bold mb-6">Úprava profilu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="full_name" className={labelClass}>
              Tvé jméno
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Jana Zcestovalá"
            />
          </div>

          <div>
            <label htmlFor="visible_email" className={labelClass}>
              Kontaktní email (pokud ti byl přiřazen)
            </label>
            <input
              type="email"
              id="visible_email"
              name="visible_email"
              value={formData.visible_email}
              onChange={handleChange}
              placeholder="prijmeni.jmeno@funweek.cz"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="primary_email" className={labelClass}>
              Přihlašovací email
            </label>
            <input
              type="email"
              id="primary_email"
              name="primary_email"
              value={initialProfile.email}
              className={`${inputClass} ${disabledClass}`}
              disabled
            />
          </div>

          <div className="hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="instagram" className={labelClass}>
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Tvé uživatelské jméno"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="linkedin" className={labelClass}>
              LinkedIn
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Tvé LinkedIn ID"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="discord" className={labelClass}>
              Discord
            </label>
            <input
              type="text"
              id="discord"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="Tvé uživatelské jméno"
              className={inputClass}
            />
          </div>
        </div>

        {isStaff && (
          <div className="border border-funweek/50 p-4 rounded-md mt-6 bg-funweek/5">
            <h3 className="text-xl font-semibold mb-4 text-funweek">
              Sekce pro dobrovolníky
            </h3>
            <div className="mb-6">
              <label className={labelClass}>Obrázek pro stránku náš tým</label>
              <div className="text-sm mb-2 font-bold text-red-700">
                <p>
                  POZOR: Doporučený poměr stran pro thumbnail je 2:3
                  (šířka:výška). Přečti si{" "}
                  <a
                    href="https://www.notion.so/Pravidla-pro-osobn-fotografie-na-u-ivatelsk-m-tu-2b2a3596c03c80b182e9e9852b14dac1?source=copy_link"
                    className="underline"
                  >
                    Pravidla pro osobní fotografie na uživatelském účtu
                  </a>{" "}
                  pro více detailů.
                </p>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <p>
                  Tento obrázek se použije na stránce{" "}
                  <a
                    href="/team"
                    className="underline cursor-pointer"
                    target="_blank"
                  >
                    náš tým
                  </a>
                  .
                </p>
              </div>

              <ThumbnailControls
                uid={initialProfile.id}
                thumbnailUrl={thumbnailUrl}
                onUpload={handleThumbnailUpload}
                onRemove={handleThumbnailRemove}
                fileInputRef={thumbnailInputRef}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 mt-6 text-white font-semibold rounded-md transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed cusror-not-allowed"
              : "bg-funweek hover:bg-funweek/80  cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? "Ukládám..." : "Uložit změny profilu"}
        </button>
      </form>
    </div>
  );
}
