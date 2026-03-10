import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Card({
  href,
  title,
  description,
  variant,
  delay,
}: {
  href: string;
  title: string;
  description: string;
  delay: number;
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
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9], delay: delay }}
    >
      <Link href={href} className={cardClasses}>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{title}</h2>
          <span className="block text-sm leading-tight">{description}</span>
        </div>
        <ArrowUpRight className="group-hover:rotate-45 transition-all" />
      </Link>
    </motion.div>
  );
}
