"use client";

import Image from "next/image";
import Card from "../components/common/Card";
import { HeroText } from "@/components/HeroText";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full px-5 md:px-10 z-0">
      <div className="min-h-[600px] md:h-[80vh] max-w-7xl flex flex-col md:flex-row gap-10 mt-27 relative mx-auto">
        <div className="flex flex-col flex-1 justify-between">
          <HeroText>Společně budujeme sebevědomí nové generace.</HeroText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10 md:py-0">
            <Card
              href="/about/project"
              title="Koncepce"
              description="Přečtěte si více o našem projektu."
              variant="primary"
              delay={0.1}
            />
            <Card
              href="/volunteers"
              title="Dobrovolnictví"
              description="Přidejte se do našeho týmu dobrovolníků."
              delay={0.2}
            />
            <Card
              href="/about/team"
              title="Náš tým"
              description="Podívejte se, kdo za Funweekem stojí."
              delay={0.3}
            />
            <Card
              href="/contact"
              title="Kontakt"
              description="Máte dotazy? Ozvěte se autorům projektu."
              delay={0.4}
            />
          </div>
        </div>
        <motion.div
          className="hidden md:flex flex-1 relative h-full"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.3 }}
        >
          <Image
            src="/images/hk.jpg"
            fill
            alt="hradec"
            className="object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </main>
  );
}
