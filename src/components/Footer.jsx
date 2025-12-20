import React from "react";
import { Milestone, Rss } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="px-5 mt-10">
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
        <Link href="/" className="hover:scale-95 transition-all">
          <Image
            src="/logo-green.svg"
            alt="Logo"
            className="w-0 md:w-5"
            width="20"
          />
        </Link>
        <div>
          <p className="text-sm text-funweek">
            © 2025 Funweek - Všechna práva vyhrazena
          </p>
        </div>
      </div>
    </footer>
  );
}
