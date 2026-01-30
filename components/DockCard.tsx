"use client";

import Image from "next/image";

export const DockCard = ({ src, alt }: { src: string; alt: string }) => {
  return (
    // Niente più CardContainer o CardBody.
    // Solo un div pulito che prende tutto lo spazio (w-full h-full).
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md border border-white/10 bg-gray-900">
      {/* L'immagine Next.js ottimizzata */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover" // Taglia l'immagine per riempire il rettangolo senza deformarsi
        sizes="(max-width: 768px) 20vw, 10vw" // Ottimizzazione per il caricamento
        priority // Carica subito queste immagini visto che sono la navigazione principale
      />

      {/* Un piccolo effetto lucido statico (opzionale) per renderle più "premium" */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
};
