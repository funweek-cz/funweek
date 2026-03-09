import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuCookingPot } from "react-icons/lu";

export default function ProjectPage() {
  return (
    <main className="w-full px-5 mt-28">
      {" "}
      <div className="max-w-7xl mx-auto">
        <div className="py-5 flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl md:text-7xl font-bold text-funweek text-center">
            Spojte se s námi.
          </h1>
          <p className="text-xl text-funweek max-w-2xl mb-10 leading-relaxed text-center">
            V případě potřeby nás neváhejte kontaktovat pomocí formuláře níže.
          </p>
        </div>

        <div className="bg-funweek rounded-2xl flex flex-col md:flex-row overflow-hidden min-h-[400px]">
          <div className="relative w-full md:w-1/3 h-64 md:h-auto">
            <Image
              src="/images/hk.jpg"
              alt="hradec"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <form className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Kontaktní formulář
              </h2>
              <p className="text-white/70 mt-2">
                Můžete nás také konktatovat na{" "}
                <Link
                  href="mailto:info@funweek.cz"
                  className="underline hover:text-white"
                >
                  info@funweek.cz
                </Link>
                .
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white/90"
                >
                  Jméno
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Jana Zcestovalá"
                  className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white/90"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="jmeno@domena.cz"
                  className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/90"
                >
                  Zpráva
                </label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  placeholder="O co se jedná..."
                  className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-white text-funweek font-bold py-3 px-6 rounded-lg hover:bg-funweek hover:text-white border border-white transition-all duration-200 cursor-pointer mt-2 w-full md:w-auto self-start"
            >
              Odeslat zprávu
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
