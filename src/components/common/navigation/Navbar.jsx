"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";
import ProfileDropdown from "./ProfileDropdown";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/common/Logo";
import NavbarItemSingle from "@/components/common/navigation/NavbarItemSingle";
import NavbarItemMulti from "@/components/common/navigation/NavbarItemMulti";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrolled(currentScroll > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await clientSupabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = clientSupabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const authLinkClasses = `font-bold px-4 py-2 rounded-lg block transition-colors duration-300 ${
    scrolled ? "text-white border-white" : "text-funweek border-funweek"
  }`;
  const loginButtonClasses = `border-2 hover:bg-white/10 ${authLinkClasses}`;

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
              links={[
                { label: "Co je Funweek?", link: "/about/project" },
                { label: "Náš tým", link: "/about/team" },
              ]}
            />
            <NavbarItemSingle
              scrolled={scrolled}
              link={"/contact"}
              label={"Kontakt"}
            />

            <li>
              {user ? (
                <ProfileDropdown user={user} scrolled={scrolled} />
              ) : (
                <Link href="/login" className={loginButtonClasses}>
                  Přihlásit se
                </Link>
              )}
            </li>
          </ul>

          <div className="flex items-center gap-4 lg:hidden">
            {user && <ProfileDropdown user={user} scrolled={scrolled} />}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors duration-300 ${scrolled ? "text-white hover:bg-white/10" : "text-funweek hover:bg-funweek/10"}`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
          <X size={32} />
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
          <li>
            <Link
              href="/volunteers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-bold hover:bg-white/10 rounded-lg px-4 transition-colors"
            >
              Dobrovolnictvo
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex justify-between items-center w-full py-2 font-bold hover:bg-white/10 rounded-lg px-4 transition-colors z-50"
            >
              O projektu
              <ChevronDown
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                size={20}
              />
            </button>
            <ul
              className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-40 mt-2" : "max-h-0"}`}
            >
              <li>
                <a
                  href="/about/project"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-semibold hover:bg-white/5 px-4 py-3 rounded-lg transition-all"
                >
                  Co je Funweek?
                </a>
              </li>
              <li>
                <a
                  href="/about/team"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-semibold hover:bg-white/5 px-4 py-3 rounded-lg transition-all"
                >
                  Náš tým
                </a>
              </li>
            </ul>
          </li>

          <li>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-bold hover:bg-white/10 rounded-lg px-4 transition-colors"
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
