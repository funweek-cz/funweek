import React from "react";
import { CookingPot } from "lucide-react";

export default function ProjectPage() {
    return (
        <main className="w-full px-5 md:px-50 py-30 md:py-50 flex flex-col justify-center items-center">
            <CookingPot size="100" className="mb-10 text-funweek"/>
            <h1 className="text-4xl font-bold text-center mb-5 md:mb-0">Tuto stránku teprve vaříme!</h1>
            <h2 className="text-xl md:text-2xl text-center">Stránky jsou stále ve výstavbě a ty jsi objevil/a stránku, kterou teprve připravujeme. Vrať se znovu brzy!</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-3">
                <a href="/" className="font-bold mt-5 md:mt-10 px-4 py-2 rounded-lg block group bg-funweek hover:scale-95 transition-all text-white ">
                    Zpět na domovskou stránku
                </a>
                <a href="/contact" className="font-bold mt-2 md:mt-10 px-4 py-2 rounded-lg block group border-funweek border-2 hover:scale-95 transition-all text-funweek ">
                    Kontaktujte nás
                </a>
            </div>
        </main>
    )
}
