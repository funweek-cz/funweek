import React from "react";

import { createClient } from "@/lib/supabase/server";
import NavbarClient from "@/components/common/navigation/Navbar.client";

const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userData, error } = await supabase
      .from("profiles")
      .select("avatar_url, full_name")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    if (userData?.avatar_url) {
      if (!userData.avatar_url.startsWith("http")) {
        const { data: urlData } = supabase.storage
          .from("pfp")
          .getPublicUrl(userData.avatar_url);

        userData.avatar_url = urlData.publicUrl;
      }
    }

    return <NavbarClient user={user} userData={userData} />;
  } else {
    return <NavbarClient user={user} />;
  }
};

export default Navbar;
