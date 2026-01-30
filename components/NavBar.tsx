"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, User, Briefcase, Guitar } from "lucide-react";
import { Calendar } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();

  // 1. Definiamo i Link del menu
  const navItems = [
    {
      name: "Eventi",
      link: "/eventi",
      icon: <Calendar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Progetti",
      link: "/progetti",
      icon: <Briefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Chi Sono",
      link: "/chi-sono",
      icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "JamSession",
      link: "/JamSession",
      icon: <Guitar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  // 2. LOGICA: Nascondi se siamo sulla Home Page "/"
  if (pathname === "/") {
    return null;
  }

  // 3. Mostra la Floating Nav
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};
