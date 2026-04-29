"use client"

import React from "react";
import { Milestone, Rss } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="px-5 md:px-10 mt-10"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto py-10 px-10 bg-funweek text-white rounded-2xl">
        <div className="justify-between items-top w-full flex flex-col gap-5 md:gap-0 md:flex-row">
          <div className="flex flex-col items-top">
            <div className="flex items-center gap-2">
              <Milestone />
              <h1 className="text-3xl">Rozcestník</h1>
            </div>
            <ul className="mt-1 text-lg">
              <li className="hover:translate-x-0.5 transition-all">
                <Link href="/about/project" className="">
                  Projekt
                </Link>
              </li>
              <li className="hover:translate-x-0.5 transition-all">
                <Link href="/volunteers" className="">
                  Dobrovolnictví
                </Link>
              </li>
              <li className="hover:translate-x-0.5 transition-all">
                <Link href="/contact" className="">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl">Sledujte nás</h1>
              <Rss />
            </div>
            <ul className="mt-1 flex flex-col justify-end text-lg">
              <li className="hover:-translate-x-0.5 transition-all md:justify-end flex gap-1">
                <Image
                  alt={""}
                  src="https://cdn.simpleicons.org/instagram/FFFFFF"
                  width="17"
                  height="17"
                  unoptimized
                />
                <Link href="/about/project" className="">
                  Instagram
                </Link>
              </li>
              <li className="hover:-translate-x-0.5 transition-all md:justify-end flex gap-1">
                <Image
                  alt={""}
                  src="https://cdn.simpleicons.org/tiktok/FFFFFF"
                  width="17"
                  height="17"
                  unoptimized
                />
                <Link href="/about/project" className="">
                  TikTok
                </Link>
              </li>
            </ul>
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
