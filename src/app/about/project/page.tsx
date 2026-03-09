import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
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

export default function ProjectPage() {

  return (
    <main className="w-full px-5 md:px-10 mb-20">
      <div className="max-w-7xl mx-auto mt-23">
        <div className="relative rounded-3xl overflow-hidden min-h-[70vh] flex flex-col justify-center items-center text-center p-5 md:p-20 isolate">
          <h1 className="text-5xl md:text-7xl font-bold text-funweek mb-6">
            Věříme, že talent se skrývá v každé školní lavici.
          </h1>

          <p className="text-xl text-funweek max-w-2xl mb-10 leading-relaxed">
            Funweek vznikl z jednoduché myšlenky: Spojit studenty z různých
            škol, zbourat předsudky a vytvořit prostor, kde nezáleží na
            známkách.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="https://www.notion.so/Konceptu-ln-z-m-r-projektu-2ada3596c03c8089aa05f3a90b9cf4f5?source=copy_link"
              className="bg-funweek text-white px-8 py-4 rounded-xl font-bold hover:bg-transparent hover:text-funweek border-funweek border transition-all flex items-center justify-center gap-2 group"
            >
              Konceptuální záměr projektu <FileText size={20} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
