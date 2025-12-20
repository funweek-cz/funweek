import React from "react";
import Link from "next/link";

const NavbarItemMulti = ({
  label = "Nový odkaz",
  links = [{ link: "/", label: "Odkaz 1" }],
  scrolled = false,
}) => {
  return (
    <li className="relative group">
      <span
        className={`font-bold px-4 py-2 rounded-lg block group transition-colors duration-300 ${scrolled ? "text-white" : "text-funweek"}`}
      >
        {label}
        <div
          className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 ${scrolled ? "bg-white" : "bg-funweek"}`}
        ></div>
      </span>
      <ul className="absolute top-full left-0 mt-2 bg-funweek/90 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl min-w-[200px] opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 list-none p-2">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="block font-semibold text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all whitespace-nowrap"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavbarItemMulti;
