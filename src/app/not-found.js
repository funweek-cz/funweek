import Image from "next/image";
import React from "react";

export default function NotFound() {
    return (
        <main className="w-full px-5 md:px-50 py-30 md:py-50 flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex flex-col">
                    <h1 className="text-4xl text-center md:text-left font-bold mb-5 md:mb-0">Naši spolupracovníci něco pokazili...</h1>
                    <h2 className="text-xl text-center md:text-left md:text-2xl mt-2">Zdá se, že požadovanou adresu neumíme najít nebo už neexistuje. Zkontroluj prosím, zda je URL adresa napsaná správně. (404)</h2>
                    <div className="flex flex-row items-center justify-center md:justify-start mt-5 gap-3">
                        <a href="/" className="flex font-bold w-fit px-4 py-2 rounded-lg bg-funweek hover:scale-95 transition-all text-white">
                            Domovská stránka
                        </a>
                        <a href="/contact" className="font-bold w-fit px-4 py-2 rounded-lg ring-funweek ring-2 ring-inset hover:scale-95 transition-all text-funweek">
                            Kontakt
                        </a>
                    </div>
                </div>
                <div>
                    <img src="/spolupracovnici.png" width="900" className="rounded-lg"/>
                </div>
            </div>

        </main>
    )
}
