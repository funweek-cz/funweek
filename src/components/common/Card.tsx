import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Card({
  href,
  title,
  description,
  variant,
}: {
  href: string;
  title: string;
  description: string;
  variant?: string;
}) {
  const cardClasses = `
    rounded-2xl p-5 flex gap-5 border border-funweek group transition-all
    ${
      variant === "primary"
        ? "bg-funweek text-white hover:bg-transparent hover:text-funweek"
        : "bg-transparent text-funweek hover:bg-funweek hover:text-white"
    }
  `;

  return (
    <Link href={href} className={cardClasses}>
      <div className="flex-1">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="block text-sm leading-tight">{description}</span>
      </div>
      <ArrowUpRight className="group-hover:rotate-45 transition-all" />
    </Link>
  );
}
