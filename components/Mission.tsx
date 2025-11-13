'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Globe, Users } from 'lucide-react';

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-150px",
  });

  const values = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Entraide",
      description: "Une communauté solidaire qui se soutient",
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Transparence",
      description: "Des informations claires et vérifiées",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Partage",
      description: "Des expériences et conseils partagés",
    },
  ];

  return (
    <section
      id="mission"
      ref={ref}
      className="py-32 bg-white scroll-mt-20"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center"
        >
          Notre mission
        </motion.h2>

        {/* Texte principal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center mt-10 space-y-6"
        >
          <p className="text-2xl text-gray-800 font-semibold leading-relaxed">
            Chaque année, des milliers d'étudiants africains partent étudier à l'étranger avec des rêves plein la tête.
          </p>

          <p className="text-lg md:text-xl text-gray-medium leading-relaxed">
            Mais la réalité les rattrape vite : paperasse complexe, solitude, démarches administratives incompréhensibles…
          </p>

          <p className="text-3xl font-bold text-orange-primary mt-8">
            Move2getr change la donne.
          </p>

          <p className="text-xl text-gray-800 font-medium">
            Une plateforme créée par des étudiants africains, pour des étudiants africains.
          </p>

          <div className="space-y-3 pt-4">
            <p className="text-2xl text-gray-900 font-semibold">Parce qu'on connaît ton parcours.</p>
            <p className="text-2xl text-gray-900 font-semibold">Parce qu'on l'a vécu.</p>
            <p className="text-2xl text-orange-primary font-bold">Parce qu'ensemble, on va plus loin.</p>
          </div>
        </motion.div>

        {/* Cartes de valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20"
        >
          {values.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-8 text-center border border-orange-primary/10 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-primary to-orange-light text-white shadow-lg">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-medium text-lg mt-2">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
