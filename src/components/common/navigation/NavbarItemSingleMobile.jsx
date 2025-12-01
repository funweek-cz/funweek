import Link from "next/link";
import React from "react";

const NavbarItemSingleMobile = ({
  link = "/",
  label = "Nový odkaz",
  onClick = () => {},
}) => {
  return (
    <li>
      <Link
        href={link}
        onClick={onClick}
        className="block py-2 font-bold hover:bg-white/10 rounded-lg px-4 transition-colors"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavbarItemSingleMobile;
