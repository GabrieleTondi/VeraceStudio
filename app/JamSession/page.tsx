"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";

export default function Strumenti() {
  const tools = [
    {
      id: 1,
      title: "Microfono",
      image: "/microphone.png",
    },
    {
      id: 2,
      title: "Chitarra Elettrica",
      image: "/chitarra.png",
    },
    {
      id: 3,
      title: "Basso",
      image: "/bass.png",
    },
    {
      id: 4,
      title: "Batteria Acustica",
      image: "/batteria.png",
    },
    {
      id: 5,
      title: "Sony A7III",
      image: "/immagine_1.jpg", // Aggiungi qui le tue altre foto se vuoi
    },
    {
      id: 6,
      title: "Workstation",
      image: "/immagine_1.jpg",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center py-40">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-24">
        Setup & Gear
      </h1>

      {/* Ritorno alla Griglia: Semplice, responsive e ordinata */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10 px-8 max-w-7xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center justify-center h-[20rem] w-full"
          >
            <PinContainer title={tool.title}>
              {/* BOX FOTO PULITO */}
              {/* Usa object-contain se le immagini sono PNG scontornate (come chitarre, microfoni) */}
              {/* Usa object-cover se sono foto rettangolari piene (come paesaggi o foto vere) */}
              <div className="relative w-[18rem] h-[18rem] bg-neutral-900/50 rounded-2xl p-4 flex items-center justify-center border border-white/5 transition-colors hover:bg-neutral-800/50">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-contain p-4 drop-shadow-2xl"
                />
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
