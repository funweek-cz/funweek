import Image from "next/image";
import Card from "../components/common/Card";

export default function Home() {
  return (
    <main className="w-full px-5 md:px-10 z-0">
      <div className="min-h-[600px] md:h-[80vh] max-w-7xl flex flex-col md:flex-row gap-10 mt-27 relative mx-auto overflow-hidden">
        <div className="flex flex-col flex-1 justify-between">
          <h1 className="text-5xl my-25 px-5 md:px-0 md:my-0 text-center md:text-left md:text-6xl md:leading-17 font-semibold">
            Společně budujeme sebevědomí nové generace.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10 md:py-0">
            <Card
              href="/about/project"
              title="Koncepce"
              description="Přečtěte si více o našem projektu."
              variant="primary"
            />
            <Card
              href="/volunteers"
              title="Dobrovolnictví"
              description="Přidejte se do našeho týmu dobrovolníků."
            />
            <Card
              href="/about/team"
              title="Náš tým"
              description="Podívejte se, kdo za Funweekem stojí."
            />
            <Card
              href="/"
              title="Kontakt"
              description="Máte dotazy? Ozvěte se autorům projektu."
            />
          </div>
        </div>
        <div className="hidden md:flex flex-1 relative h-full">
          <Image
            src="/images/hk.jpg"
            fill
            alt="hradec"
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
}
