"use client";
import { LuChevronDown } from "react-icons/lu";
import React, { useState } from "react";
import Link from "next/link";

const NavbarItemMultiMobile = ({
  closeMenuFunction = () => {},
  label = "Nový dropdown",
  links = [{ link: "/", label: "Odkaz 1" }],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <li className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex justify-between items-center w-full py-2 font-bold hover:bg-white/10 rounded-lg px-4 transition-colors z-50"
      >
        {label}
        <LuChevronDown
          className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
          size={20}
        />
      </button>
      <ul
        className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-40 mt-2" : "max-h-0"}`}
      >
        {links?.map((link, index) => (
          <li key={index}>
            <Link
              href={link.link}
              onClick={closeMenuFunction}
              className="block font-semibold hover:bg-white/5 px-4 py-3 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavbarItemMultiMobile;
