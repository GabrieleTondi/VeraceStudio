"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";

export default function Progetti() {
  const words = ["Arte Figurativa", "Musica", "Esposizioni", "Concerti", "..."];
  const projects = [
    {
      id: 1,
      title: "Verace E-Commerce",
      description:
        "Una piattaforma di vendita online con animazioni fluide e pagamenti integrati.",
      image: "/immagine_1.jpg",
      link: "...",
    },
    {
      id: 2,
      title: "Portfolio 2024",
      description:
        "Design minimalista per esporre opere d'arte digitali e fotografia.",
      image: "/immagine_2.jpg",
      link: "...",
    },
    {
      id: 3,
      title: "App Gestionale",
      description:
        "Dashboard interattiva per la gestione dei flussi di lavoro aziendali.",
      image: "/immagine_3.jpg",
      link: "...",
    },
    {
      id: 4,
      title: "Progetto Extra",
      description: "Un quarto progetto per vedere come si allinea la griglia.",
      image: "/immagine_4.jpg",
      link: "...",
    },
  ];

  return (
    <div className="min-h-screen bg-black py-40 px-4">
      {/* HEADER: Ridotto il margine inferiore (mb-8) */}
      <div className="max-w-7xl mx-auto mb-8 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-neutral-200">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-bold text-neutral-200"
          >
            I Progetti
          </motion.h1>
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-neutral-400 mt-4"
        >
          I nostri lavori migliori
          <FlipWords words={words} /> <br />
        </motion.div>
      </div>

      {/* GRIGLIA: Ridotto il gap tra le card (gap-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-0.5 max-w-7xl mx-auto w-full">
        {projects.map((item) => (
          <CardContainer key={item.id} className="inter-var w-full">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {item.title}
              </CardItem>

              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {item.description}
              </CardItem>

              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={item.image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>

              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={item.link}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Dettagli →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Visita Sito
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
