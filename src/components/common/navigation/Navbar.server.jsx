import React from "react";

import { createClient } from "@/lib/supabase/server";
import NavbarClient from "@/components/common/navigation/Navbar.client";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavbarClient user={user} />;
};

export default Navbar;
