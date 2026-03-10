"use client"
import { motion } from "framer-motion";
import { FC } from "react";

interface HeroTextProps {
    children: string;
}

export const HeroText: FC<HeroTextProps> = ({ children }) => (
  <motion.h1
    className="text-5xl my-25 px-5 md:px-0 md:my-0 text-center md:text-left md:text-6xl md:leading-17 font-semibold"
    initial="hidden"
    animate="show"
    variants={{
      show: { transition: { staggerChildren: 0.1 } },
    }}
  >
    {children.split(" ").map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-[0.25em]"
        variants={{
          hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
          },
        }}
      >
        {word}
      </motion.span>
    ))}
  </motion.h1>
);