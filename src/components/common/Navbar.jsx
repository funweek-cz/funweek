"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";
import ProfileDropdown from "../ProfileDropdown";
import { Menu, X, ChevronDown } from "lucide-react";

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
  const navLinkClasses = (isHovered = true) =>
    `font-bold px-4 py-2 rounded-lg block group transition-colors duration-300 ${scrolled ? "text-white" : "text-funweek"}`;

  const Logo = () => (
    <Link
      href="/public"
      className={`text-2xl font-bold ${scrolled ? "text-white" : "text-funweek"} hover:scale-95 transition-transform flex gap-2`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 213 213"
        width="40"
        height="40"
        fill="currentColor"
        className="transition-colors duration-300"
      >
        <path
          d="M213 132.55C168.569 132.55 132.55 168.569 132.55 213H106.5C106.5 154.182 154.182 106.5 213 106.5V132.55Z"
          fill="currentColor"
        />
        <path
          d="M80.4496 213C80.4496 168.569 44.4311 132.55 0 132.55V106.5C58.8183 106.5 106.5 154.182 106.5 213H80.4496Z"
          fill="currentColor"
        />
        <path
          d="M0 80.4496C44.4311 80.4496 80.4496 44.4311 80.4496 0H106.5C106.5 58.8183 58.8183 106.5 0 106.5V80.4496Z"
          fill="currentColor"
        />
        <path
          d="M132.55 1.1387e-06C132.55 44.4311 168.569 80.4496 213 80.4496V106.5C154.182 106.5 106.5 58.8183 106.5 0L132.55 1.1387e-06Z"
          fill="currentColor"
        />
        <path
          d="M201.507 32.563C201.507 44.1997 192.074 53.6331 180.437 53.6331C168.8 53.6331 159.367 44.1997 159.367 32.563C159.367 20.9262 168.8 11.4928 180.437 11.4928C192.074 11.4928 201.507 20.9262 201.507 32.563Z"
          fill="currentColor"
        />
        <path
          d="M52.8669 181.203C52.8669 192.84 43.4335 202.273 31.7968 202.273C20.16 202.273 10.7266 192.84 10.7266 181.203C10.7266 169.567 20.16 160.133 31.7968 160.133C43.4335 160.133 52.8669 169.567 52.8669 181.203Z"
          fill="currentColor"
        />
        <path
          d="M52.8669 32.563C52.8669 44.1997 43.4335 53.6331 31.7968 53.6331C20.16 53.6331 10.7266 44.1997 10.7266 32.563C10.7266 20.9262 20.16 11.4928 31.7968 11.4928C43.4335 11.4928 52.8669 20.9262 52.8669 32.563Z"
          fill="currentColor"
        />
        <path
          d="M201.507 181.203C201.507 192.84 192.074 202.273 180.437 202.273C168.8 202.273 159.367 192.84 159.367 181.203C159.367 169.567 168.8 160.133 180.437 160.133C192.074 160.133 201.507 169.567 201.507 181.203Z"
          fill="currentColor"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="" id="gabarito">
          Funweek
        </span>
        <span className="text-sm font-normal">Hradec Králové 2028</span>
      </div>
    </Link>
  );

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
          <Logo />

          <ul className="hidden lg:flex gap-8 list-none items-center">
            <li>
              <a href="/volunteers" className={navLinkClasses()}>
                Dobrovolnictvo
                <div
                  className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 ${scrolled ? "bg-white" : "bg-funweek"}`}
                ></div>
              </a>
            </li>
            <li className="relative group">
              <span className={navLinkClasses()}>
                O projektu
                <div
                  className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 ${scrolled ? "bg-white" : "bg-funweek"}`}
                ></div>
              </span>
              <ul className="absolute top-full left-0 mt-2 bg-funweek/90 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl min-w-[200px] opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 list-none p-2">
                <li>
                  <a
                    href="/about/project"
                    className="block font-semibold text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all whitespace-nowrap"
                  >
                    Co je Funweek?
                  </a>
                </li>
                <li>
                  <a
                    href="/about/team"
                    className="block font-semibold text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all whitespace-nowrap"
                  >
                    Náš tým
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/contact" className={navLinkClasses()}>
                Kontakt
                <div
                  className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 ${scrolled ? "bg-white" : "bg-funweek"}`}
                ></div>
              </a>
            </li>

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
