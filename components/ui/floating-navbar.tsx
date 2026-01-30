"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Partiamo visibili

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Controlla la direzione dello scroll
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Sempre visibile in cima alla pagina
      } else {
        if (direction < 0) {
          setVisible(true); // Visibile se scorri verso l'alto
        } else {
          setVisible(false); // Nascosta se scorri verso il basso
        }
      }
    }
  });

  // ... (tutto il codice sopra rimane uguale)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // MODIFICA 1: Ho cambiato "pr-2 pl-8" in "pl-2 pr-8"
          // così il bottone sta comodo a sinistra e i testi respirano a destra
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/50 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pl-2 pr-8 py-2  items-center justify-center space-x-4",
          className,
        )}
      >
        {/* MODIFICA 2: Il bottone "Contattami" ora è QUI (prima del map) */}
        <Link
          href="/"
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
        >
          <span>Home</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </Link>
        {/* Poi vengono i link (Home, Eventi, ecc.) */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-300 dark:hover:text-neutral-300 hover:text-neutral-500",
            )}
          >
            <span className="block sm:hidden text-neutral-500 dark:text-white">
              {navItem.icon}
            </span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
