"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

export async function updateProfile(formData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Uživatel není přihlášen" };
  }

  const updates = {
    full_name: formData.full_name,
    instagram: formData.instagram || null,
    linkedin: formData.linkedin || null,
    discord: formData.discord || null,
    visible_email: formData.visible_email || null,
  };

  if (formData.thumbnail_image !== undefined) {
    updates.thumbnail_image = formData.thumbnail_image || null;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

export async function uploadAvatar(formData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Uživatel není přihlášen" };
  }

  const file = formData.get("file");
  const oldAvatarUrl = formData.get("oldAvatarUrl");

  if (!file) {
    return { error: "Žádný soubor nebyl nahrán" };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}-${generateRandomString(8)}.${fileExt}`;
  const filePath = `${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  if (oldAvatarUrl) {
    try {
      const oldFileName = oldAvatarUrl.substring(
        oldAvatarUrl.lastIndexOf("/") + 1,
      );
      if (oldFileName && oldFileName.length > 0) {
        await supabase.storage.from("avatars").remove([oldFileName]);
      }
    } catch (e) {
      // Ignorujeme chyby při mazání starého avataru
    }
  }

  revalidatePath("/dashboard/profile");
  return { success: true, avatarUrl: publicUrl };
}

export async function removeAvatar() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Uživatel není přihlášen" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  if (profile?.avatar_url) {
    try {
      const fileName = profile.avatar_url.substring(
        profile.avatar_url.lastIndexOf("/") + 1,
      );
      if (fileName && fileName.length > 0) {
        await supabase.storage.from("avatars").remove([fileName]);
      }
    } catch (e) {
      // Ignorujeme chyby při mazání
    }
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}

export async function uploadThumbnail(formData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Uživatel není přihlášen" };
  }

  const file = formData.get("file");
  const oldThumbnailUrl = formData.get("oldThumbnailUrl");

  if (!file) {
    return { error: "Žádný soubor nebyl nahrán" };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}-${generateRandomString(8)}.${fileExt}`;
  const filePath = `${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("thumbnails")
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("thumbnails").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ thumbnail_image: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  if (oldThumbnailUrl) {
    try {
      const oldFileName = oldThumbnailUrl.substring(
        oldThumbnailUrl.lastIndexOf("/") + 1,
      );
      if (oldFileName && oldFileName.length > 0) {
        await supabase.storage.from("thumbnails").remove([oldFileName]);
      }
    } catch (e) {
      // Ignorujeme chyby při mazání
    }
  }

  revalidatePath("/dashboard/profile");
  return { success: true, thumbnailUrl: publicUrl };
}

export async function removeThumbnail() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Uživatel není přihlášen" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("thumbnail_image")
    .eq("id", user.id)
    .single();

  if (profile?.thumbnail_image) {
    try {
      const fileName = profile.thumbnail_image.substring(
        profile.thumbnail_image.lastIndexOf("/") + 1,
      );
      if (fileName && fileName.length > 0) {
        await supabase.storage.from("thumbnails").remove([fileName]);
      }
    } catch (e) {
      // Ignorujeme chyby při mazání
    }
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ thumbnail_image: null })
    .eq("id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/dashboard/profile");
  return { success: true };
}
