"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const MobileHero = () => {
  const [videoIntro, setVideoIntro] = useState(false);
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    // Controlliamo se nel sessionStorage c'è già il flag "hasSeenHero"
    const hasSeenHero = sessionStorage.getItem("hasSeenHero");
    if (!hasSeenHero) {
      setVideoIntro(true);
      setIsDone(false);

      // Fai svanire il video esattamente dopo 3 secondi
      const timer = setTimeout(() => {
        setVideoIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (isDone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black block md:hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: videoIntro ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (!videoIntro) {
          setIsDone(true);
          // Salviamo il flag per le visite future in questa sessione
          sessionStorage.setItem("hasSeenHero", "true");
        }
      }}
    >
      {/* 3. Il player video nativo */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
        src="/tiktok_media.mp4"
      />
    </motion.div>
  );
};
