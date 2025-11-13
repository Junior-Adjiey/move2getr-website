'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants
} from 'framer-motion';

import { ArrowDown, Download, Users, Globe } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

// Types pour une meilleure sécurité
interface CustomWindow extends Window {
  openDownloadPopup?: () => void;
}
declare const window: CustomWindow;

/* -------------------------- Variants typés proprement -------------------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/* ------------------------------------------------------------------------------ */

export default function Hero() {
  const missionRef = useRef<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ------------------------------ Scroll lisse ------------------------------ */
  const scrollToDiscover = useCallback(() => {
    missionRef.current = document.getElementById("mission");
    missionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ------------------------------ Gestion Download ------------------------------ */
  const handleDownload = useCallback(async () => {
    if (!window.openDownloadPopup) {
      window.open("/download", "_blank");
      return;
    }

    setIsLoading(true);

    try {
      await Promise.race([
        window.openDownloadPopup(),
        new Promise(res => setTimeout(res, 3000))
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* ----------------------- Effet 3D sur le mockup ----------------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    damping: 25,
    stiffness: 300
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    damping: 25,
    stiffness: 300
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, []);

  /* ------------------------------------------------------------------------------ */

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300">

      {/* Background animé */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >

          {/* Texte */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Titre principal */}
            <motion.h1
                variants={itemVariants}
                className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[1.1] text-white"
            >
                <span className=" bg-clip-texxt">
                MOVE2GETR
                </span>
            </motion.h1>

            {/* Sous-titre très fort */}
            <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
            >
                La communauté des étudiants  
                <span className="text-orange-200"> africains à l’étranger </span>
            </motion.h2>

            {/* Paragraphe descriptif */}
            <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl text-white/90 max-w-2xl leading-relaxed"
            >
                Simplifie ton arrivée, ton intégration et ton quotidien à l’étranger.  
                <span className="text-orange-200 font-semibold block mt-2">
                Rejoins une communauté solidaire, informée et connectée.
                </span>
            </motion.p>
            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >

              {/* BTN DOWNLOAD */}
              <motion.button
                onClick={handleDownload}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-9 px-[20px] py-5 text-xl bg-white text-orange-600 font-bold rounded-[90px] shadow-xl flex items-center gap-4 whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-10 h-10" />
                )}

                {isLoading ? "Téléchargement..." : "Télécharger l'app"}
              </motion.button>

              {/* BTN DISCOVER */}
              <motion.button
                onClick={scrollToDiscover}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-9 px-12 py-6 border-2 text-xl border-white text-white font-bold rounded-[90px] flex items-center gap-3 whitespace-nowrap"
              >
                <Globe className="w-10 h-10" />
                Découvrir la communauté
              </motion.button>
            </motion.div>

          </div>

          {/* Phone mockup avec image Figma */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="relative w-full flex justify-center cursor-pointer"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <div className="relative w-[550px] drop-shadow-2xl ml-5">
                <img
                  src="/mockups/move2getr-phone.png"
                  alt="Mockup MOVE2GETR"
                  className="w-full h-auto rounded-[2.5rem]"
                />
                {/* Badge “Bientôt disponible” */}                
              <div className="absolute top-8 right-8 bg-white rounded-2xl px-6 py-3 shadow-xl flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="text-gray-700 font-semibold">Bientôt disponible</span>
              </div>
              </div>

            </motion.div>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToDiscover}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm"
          >
            <ArrowDown className=" w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
