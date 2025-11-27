import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full px-5 md:px-50 py-30 md:py-50 flex flex-col justify-center items-center">
      <Image
        src="/assets/images/ui/die.webp"
        alt={"Die Emoji"}
        width={"100"}
        height={"100"}
        className="mb-10"
      />
      <h1 className="text-4xl font-bold text-center mb-5 md:mb-0">
        Tato stránka se nám ztratila z radaru...
      </h1>
      <h2 className="text-xl md:text-2xl text-center">
        Zdá se, že požadovanou adresu neumíme najít nebo už neexistuje.
        Zkontroluj prosím, zda je URL adresa napsaná správně.
      </h2>
      <Link
        href="/"
        className="font-bold mt-5 md:mt-10 px-4 py-2 rounded-lg block group bg-funweek hover:scale-95 transition-all text-white "
      >
        Zpět na domovskou stránku
      </Link>
    </main>
  );
}
