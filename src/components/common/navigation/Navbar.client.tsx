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
import { motion } from "framer-motion";

export default function NavbarClient({
  user,
  userData,
}: {
  user: any;
  userData?: any;
}) {
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
    { label: "Harmonogram", link: "/about/harmonogram" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center px-5 md:px-10">
        <motion.nav
          className={`pointer-events-auto w-full max-w-7xl transition-all duration-300 ease-out mt-2 rounded-2xl ${
            scrolled
              ? "md:px-8 px-4 py-4 bg-funweek/80 text-white backdrop-blur border border-white/20 shadow-2xl"
              : "py-6 text-funweek"
          }`}
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="flex justify-between items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              <Logo isWhite={scrolled} />
            </motion.div>

            <ul className="hidden lg:flex gap-8 list-none items-center">
              <motion.div
                initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 0.1,
                }}
              >
                <NavbarItemSingle
                  scrolled={scrolled}
                  link={"/volunteers"}
                  label={"Dobrovolnictví"}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 0.2,
                }}
              >
                <NavbarItemMulti
                  scrolled={scrolled}
                  label={"O projektu"}
                  links={aboutDropdownLinks}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 0.3,
                }}
              >
                <NavbarItemSingle
                  scrolled={scrolled}
                  link={"/contact"}
                  label={"Kontakt"}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: 0.4,
                }}
              >
                <li>
                  {user ? (
                    <ProfileDropdown userData={userData} scrolled={scrolled} />
                  ) : (
                    <Link href="/login" className={loginButtonClasses}>
                      Přihlásit se
                    </Link>
                  )}
                </li>
              </motion.div>
            </ul>

            <motion.div
              className="flex items-center gap-4 lg:hidden"
              initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                ease: [0.2, 0.65, 0.3, 0.9],
                delay: 0.4,
              }}
            >
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
            </motion.div>
          </div>
        </motion.nav>

        <div
          className={`fixed top-0 left-0 h-full w-full transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0 z-50 opacity-100"
              : "translate-x-full z-0 opacity-0"
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
                  className="block py-3 font-bold hover:bg-white/50 bg-white text-funweek rounded-lg px-4 transition-colors"
                >
                  Přihlásit se
                </Link>
              )}
            </li>
            <NavbarItemSingleMobile
              link={"/volunteers"}
              label={"Dobrovolnictví"}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <NavbarItemMultiMobile
              closeMenuFunction={() => setIsMobileMenuOpen(false)}
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
      </div>
    </>
  );
}
