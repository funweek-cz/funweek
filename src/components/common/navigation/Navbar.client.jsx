"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import Logo from "@/components/common/Logo";
import NavbarItemSingle from "@/components/common/navigation/NavbarItemSingle";
import NavbarItemMulti from "@/components/common/navigation/NavbarItemMulti";
import { LuMenu, LuX } from "react-icons/lu";
import NavbarItemSingleMobile from "@/components/common/navigation/NavbarItemSingleMobile";
import NavbarItemMultiMobile from "@/components/common/navigation/NavbarItemMultiMobile";

export default function NavbarClient({ user, userData }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const authLinkClasses = `font-bold px-4 py-2 rounded-lg block transition-colors duration-300 ${
    scrolled ? "text-white border-white" : "text-funweek border-funweek"
  }`;
  const loginButtonClasses = `border-2 hover:bg-white/10 ${authLinkClasses}`;

  const aboutDropdownLinks = [
    { label: "Co je Funweek?", link: "/about/project" },
    { label: "Náš tým", link: "/about/team" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "m-4 px-8 py-4 bg-funweek/80 text-white backdrop-blur rounded-2xl border border-white/20 shadow-2xl"
            : "px-8 py-6 text-funweek"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo isWhite={scrolled} />

          <ul className="hidden lg:flex gap-8 list-none items-center">
            <NavbarItemSingle
              scrolled={scrolled}
              link={"/volunteers"}
              label={"Dobrovolnictvo"}
            />
            <NavbarItemMulti
              scrolled={scrolled}
              label={"O projektu"}
              links={aboutDropdownLinks}
            />
            <NavbarItemSingle
              scrolled={scrolled}
              link={"/contact"}
              label={"Kontakt"}
            />

            <li>
              {user ? (
                <ProfileDropdown userData={userData} scrolled={scrolled} />
              ) : (
                <Link href="/login" className={loginButtonClasses}>
                  Přihlásit se
                </Link>
              )}
            </li>
          </ul>

          <div className="flex items-center gap-4 lg:hidden">
            {user && (
              <ProfileDropdown userData={userData} scrolled={scrolled} />
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors duration-300 ${scrolled ? "text-white hover:bg-white/10" : "text-funweek hover:bg-funweek/10"}`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <LuX size={28} /> : <LuMenu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-full z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } bg-funweek/95 backdrop-blur-lg lg:hidden p-8 text-white flex flex-col space-y-4`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full text-white hover:bg-white/10 transition-colors"
          aria-label="Close Menu"
        >
          <LuX size={32} />
        </button>

        <ul className="flex flex-col space-y-4 text-xl mt-12">
          <li>
            {!user && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-bold hover:bg-white/50 bg-white text-funweek rounded-lg px-4 transition-colors"
              >
                Přihlásit se
              </Link>
            )}
          </li>
          <NavbarItemSingleMobile
            link={"/volunteers"}
            label={"Dobrovolnictvo"}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <NavbarItemMultiMobile
            closeMenuFunction={() => setIsDropdownOpen(!isDropdownOpen)}
            label={"O projektu"}
            links={aboutDropdownLinks}
          />

          <NavbarItemSingleMobile
            link={"/contact"}
            label={"Kontakt"}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </ul>
      </div>
    </>
  );
}
