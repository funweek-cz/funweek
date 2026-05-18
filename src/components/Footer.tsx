"use client"

import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "@/components/common/Logo";

export default function Footer() {
  return (
    <motion.footer
      className="px-5 md:px-10 mt-10"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto py-10 px-10 bg-funweek text-white rounded-2xl flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h1 className="text-4xl font-semibold">Funweek.cz</h1>
              <h1 className="text-xl">Budujeme sebevědomí nové generace.</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/funweek.cz"
                className="opacity-50 hover:opacity-100 transition-all"
              >
                <Image
                  unoptimized
                  src="https://cdn.simpleicons.org/instagram/FFFFFF"
                  alt="github"
                  width="25"
                  height="25"
                />
              </Link>
              <Link
                href="https://github.com/funweek-cz"
                className="opacity-50 hover:opacity-100 transition-all"
              >
                <Image
                  unoptimized
                  src="https://cdn.simpleicons.org/github/FFFFFF"
                  alt="github"
                  width="25"
                  height="25"
                />
              </Link>
              <Link
                href="/contact"
                className="opacity-50 hover:opacity-100 transition-all"
              >
                <Mail size="25" strokeWidth="2.5" />
              </Link>
            </div>
            <Image
              src="/assets/not-by-ai/notai-white.svg"
              alt="Made by Human, not by AI"
              width="100"
              height="42"
            />
          </div>
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex flex-col md:flex-row gap-5 md:justify-end">
            <div>
              <h1 className="font-semibold text-xl mb-2">Projekt</h1>
              <ul className="space-y-0.5">
                <li>
                  <Link
                    href="/about/project"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    Koncepce
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/volunteers"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    Dobrovolnictví
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/team"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    Náš tým
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/harmonogram"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    Harmonogram
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="font-semibold text-xl mb-2">Odkazy</h1>
              <ul className="space-y-0.5">
                <li>
                  <Link
                    href="https://www.instagram.com/funweek.cz"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    Instagram
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/funweek-cz/"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    GitHub
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
                  >
                    Kontakt
                    <ArrowUpRight
                      size={14}
                      className="ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto my-5 gap-1">
        <div className="flex gap-5">
          <Link href="/docs/pp" className="text-sm  text-funweek">
            Zásady soukromí
          </Link>
          <Link href="/docs/tos" className="text-sm text-funweek">
            Podmínky používání
          </Link>
        </div>
        <Link href="/" className="hover:rotate-90 transition-transform">
          <Image
            src="/logo-green.svg"
            alt="Logo"
            className="w-0 md:w-6"
            width="20"
            height="20"
          />
        </Link>
        <div>
          <p className="text-sm text-funweek">
            © 2026 Funweek - Všechna práva vyhrazena
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
