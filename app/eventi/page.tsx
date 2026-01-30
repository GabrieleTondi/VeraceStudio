"use client";

import { motion } from "framer-motion";
import { EventsCalendar } from "@/components/EventsCalendar";
import { FlipWords } from "@/components/ui/flip-words";

export default function Eventi() {
  const words = ["Mostre", "Workshop", "Concerti"];
  return (
    <div className="min-h-screen bg-black w-full pt-40 pb-20 px-8">
      {/* Titolo Pagina */}
      <div className="max-w-5xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-bold text-neutral-200"
        >
          Calendario
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-neutral-400 mt-4"
        >
          Tutti gli appuntamenti:
          <FlipWords words={words} /> <br />
        </motion.div>
      </div>

      {/* Box Calendario */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-5xl mx-auto bg-neutral-950 border border-neutral-800 rounded-2xl p-8 md:p-12 shadow-2xl"
      >
        <EventsCalendar />
      </motion.div>
    </div>
  );
}
