import React from "react";
import { Milestone, Rss } from "lucide-react";

export default function Footer() {
    return (
        <footer className="px-5">
            <div className="max-w-7xl mx-auto py-10 px-10 bg-funweek text-white rounded-2xl">
                <div className="justify-between items-top w-full flex flex-col gap-5 md:gap-0 md:flex-row">
                    <div className="flex flex-col items-top">
                        <div className="flex items-center gap-2">
                            <Milestone/>
                            <h1 className="text-3xl">Rozcestník</h1>
                        </div>
                        <ul className="mt-1 text-lg">
                            <li className="hover:translate-x-0.5 transition-all">
                                <a href="/about/project" className="">Projekt</a>
                            </li>
                            <li className="hover:translate-x-0.5 transition-all">
                                <a href="/volunteers" className="">Dobrovolnictví</a>
                            </li>
                            <li className="hover:translate-x-0.5 transition-all">
                                <a href="/contact" className="">Kontakt</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl">Sledujte nás</h1>
                            <Rss/>
                        </div>
                        <ul className="mt-1 flex flex-col justify-end text-lg">
                            <li className="hover:-translate-x-0.5 transition-all md:justify-end flex gap-1">
                                <img src="https://cdn.simpleicons.org/instagram/FFFFFF" width="17"/>
                                <a href="/about/project" className="">Instagram</a>
                            </li>
                            <li className="hover:-translate-x-0.5 transition-all md:justify-end flex gap-1">
                                <img src="https://cdn.simpleicons.org/tiktok/FFFFFF" width="17"/>
                                <a href="/about/project" className="">TikTok</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto my-5 gap-1">
                <div className="flex gap-5">
                    <a href="/docs/pp" className="text-sm  text-funweek">Zásady soukromí</a>
                    <a href="/docs/tos" className="text-sm text-funweek">Podmínky používání</a>
                </div>
                <a href="/" className="hover:scale-95 transition-all">
                    <img src="/logo-green.svg" alt="Logo" className="w-0 md:w-5" width="20" />
                </a>
                <div>
                    <p className="text-sm text-funweek">© 2025 Funweek - Všechna práva vyhrazena</p>
                </div>
            </div>
        </footer>
    )
}
