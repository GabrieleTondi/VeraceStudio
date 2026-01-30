"use client";

import { motion } from "framer-motion";

export default function ChiSono() {
  return (
    <div className="min-h-screen w-full bg-black text-white px-8 pt-40 pb-40 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl text-center space-y-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-200">
          Chi Sono
        </h1>

        <p className="text-xl text-neutral-400 leading-relaxed">
          Qui racconterai la tua storia, la tua visione e il tuo approccio
          all\&apos;arte e al design. Questo spazio è pronto per accogliere il
          tuo testo.
        </p>

        {/* Esempio di box decorativo */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-10" />
      </motion.div>
    </div>
  );
}
