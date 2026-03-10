import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Users,
  Zap,
  BookOpen,
  Smile,
  CheckCircle,
  FileText,
  Download,
  Megaphone,
  Monitor,
  ShieldAlert,
  Star,
} from "lucide-react";
import BenefitCard from "@/components/volunteers/BenefitCard";
import StepCard from "@/components/volunteers/StepCard";
import TeamCard from "@/components/volunteers/TeamCard";
import BenefitList from "@/components/volunteers/BenefitList";

export default function VolunteersPage() {
  const teams = [
    {
      title: "Socials & PR",
      icon: <Megaphone />,
      desc: "Tvorba contentu, focení, stories a promo.",
    },
    {
      title: "Komunitní tým",
      icon: <Smile />,
      desc: "Workshopy, pohoda účastníků, atmosféra.",
    },
    {
      title: "Produkce",
      icon: <Zap />,
      desc: "Organizace finále, backstage, hladký průběh.",
    },
    {
      title: "Technika",
      icon: <Monitor />,
      desc: "Stream, světla, zvuk, IT podpora.",
    },
    {
      title: "Bezpečnost",
      icon: <ShieldAlert />,
      desc: "Zdravotník a dohled (vyžaduje 18+ a speciální školení).",
    },
    {
      title: "Dobrovolník pro všechno",
      icon: <Heart />,
      desc: "Pomocná ruka tam, kde to je zrovna potřeba.",
    },
  ];

  return (
    <main className="w-full px-5 mb-20">
      <div className="max-w-7xl mx-auto mt-35 md:mt-23">
        <div className="relative rounded-3xl overflow-hidden min-h-[70vh] flex flex-col justify-center items-center text-center md:p-20 isolate">
          <h1 className="text-5xl md:text-7xl font-semibold text-funweek mb-6">
            Nečekejte, až se věci stanou. Dělejte je.
          </h1>

          <p className="text-xl text-funweek max-w-2xl mb-10 leading-relaxed">
            Staň se dobrovolníkem na Funweeku! Nejenom, že nabereš nové
            zkušenosti a získáš užitečný certifikát, ale také zažiješ spoustu
            zábavy a budeš mít naprosto jedinečný zážitek.
          </p>

          <div className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
            <Link
              href="https://funweek.fillout.com/volunteering"
              className="bg-funweek text-white px-8 py-4 rounded-xl font-bold w-fit hover:bg-transparent hover:text-funweek border-funweek border transition-all flex items-center justify-center gap-2 group"
            >
              Vyplnit přihlášku{" "}
              <ArrowUpRight
                size={20}
                className="group-hover:rotate-45 transition-all"
              />
            </Link>
            <Link
              href="https://www.notion.so/Detailn-informace-k-dobrovolnictv-2bca3596c03c80bcae71c955d14b8c4b?source=copy_link"
              className="bg-transparent hover:bg-funweek hover:text-white border-funweek border text-funweek px-8 py-4 rounded-xl w-fit font-bold transition-all flex items-center justify-center gap-2"
            >
              Detailní dokument s informacemi <FileText size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 md:mt-32">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-funweek">
          Proč do toho jít s námi?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <BenefitCard icon="BookOpen" title="Co škola nenaučí">
            Získáš soft-skills v praxi. Práce v týmu, krizový management a
            reálná produkce eventu.
          </BenefitCard>
          <BenefitCard icon="Users" title="Nová parta">
            Poznáš lidi se stejnou vizí. Žádný trapný seznamování, prostě
            přirozená atmosféra.
          </BenefitCard>
          <BenefitCard icon="Heart" title="Smysl a dopad">
            Tvoje práce bude vidět. Pomůžeš dětem zvednout sebevědomí a zažít
            úspěch.
          </BenefitCard>
          <BenefitCard icon="Zap" title="Růst a inspirace">
            Vystoupíš z komfortní zóny a inspiruješ se lidmi kolem sebe. To tě
            posune dál.
          </BenefitCard>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 md:mt-32">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-funweek">
          Jak se k nám přidat?
        </h1>
        <div className="flex flex-col md:flex-row gap-5">
          <StepCard icon="FileText" title="Pošli přihlášku">
            Zabere to 5 minut. Vybereš si tým, co tě baví (nezávazně).
          </StepCard>
          <StepCard icon="Smile" title="Krátký hovor">
            Pobavíme o tom, co ti sedne a budeme se snažit ti vyjít vstříc.
          </StepCard>
          <StepCard icon="CheckCircle" title="A je to!" isFinal>
            Potvrdíme tvoji účast a budeme pokračovat organizací akce a
            školením.
          </StepCard>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 md:mt-32">
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-funweek">
          Kde můžeš pomoci?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map((item, index) => (
            <TeamCard
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 p-8 md:p-12 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              Co za to pro tebe máme?
            </h1>
            <BenefitList />
          </div>

          <div className="w-full md:w-auto flex flex-col gap-2">
            <Link
              href="https://funweek.fillout.com/volunteering"
              className="bg-funweek text-white px-8 py-4 rounded-xl font-bold hover:bg-transparent hover:text-funweek border-funweek border transition-all flex items-center justify-center gap-2 group"
            >
              Vyplnit přihlášku{" "}
              <ArrowUpRight
                size={20}
                className="group-hover:rotate-45 transition-all"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
