"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DockCard } from "@/components/DockCard";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FloatingDock } from "@/components/FloatingNavBar";
import {
  IconHome,
  IconUser,
  IconMessage,
  IconBriefcase,
} from "@tabler/icons-react";
import { MobileHero } from "@/components/MobileHero";

const links = [
  {
    title: "Eventi",
    icon: <DockCard src="/immagine_1.jpg" alt="Home" />,
    href: "/eventi",
  },
  {
    title: "Progetti",
    icon: <DockCard src="/immagine_2.jpg" alt="Progetti" />,
    href: "/progetti",
  },
  {
    title: "Chi Sono",
    icon: <DockCard src="/immagine_3.jpg" alt="Chi Sono" />,
    href: "/chi-sono",
  },
  {
    title: "JamSession",
    icon: <DockCard src="/immagine_4.jpg" alt="JamSession" />,
    href: "/JamSession",
  },
];

const people = [
  {
    id: 1,
    name: "Baffo",
    designation: "Professional Laughter",
    image: "/id_1.jpg", // Assicurati che questa foto esista in /public
  },
  {
    id: 2,
    name: "Tod",
    designation: "O melhor",
    image: "/id_2.jpg",
  },
  {
    id: 3,
    name: "Sunny",
    designation: "The Sunflower",
    image: "/id_3.jpg",
  },
];

export default function Home() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-start pt-40 pb-40 gap-8 relative">

    //   {/* 2. INSERISCI LO SFONDO QUI, PRIMA DI TUTTO */}
    //   <ParticleWaveBackground />
    <div className="flex min-h-screen flex-col items-center justify-end p-30">
      <MobileHero />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <FloatingDock items={links} />
      </div>
      <h1 className="text-4xl font-bold">VeraceStudio</h1>
      <p className="mt-4 text-xl">exposing art</p>
      <div className="fixed bottom-15 right-20 z-50 flex flex-row items-center justify-center">
        <AnimatedTooltip items={people} />
      </div>
    </div>
  );
}
