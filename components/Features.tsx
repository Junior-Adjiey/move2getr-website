'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, MessageCircle, Users } from 'lucide-react';

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Compass className="w-16 h-16" />,
      title: "Mes démarches",
      description: "Guides interactifs pour visa, CAF, banque, santé...",
      details: "Fini les heures perdues sur Google. On t'explique TOUT, pas à pas.",
      stat: "75% des étudiants disent que c'est leur plus gros problème",
      image: "/mockups/MOVE2GETR_2-Photoroom.png",
      gradient: "from-orange-primary to-orange-light"
    },
    {
      icon: <MessageCircle className="w-16 h-16" />,
      title: "Communauté",
      description: "Publications, entraide, réactions.",
      details: "Pose tes questions, partage tes bons plans, aide les nouveaux.",
      stat: "Une vraie famille loin de chez toi.",
      image: "/mockups//MOVE2GETR_3-Photoroom.png",
      gradient: "from-blue-primary to-purple-500"
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: "Réseau & Identité",
      description: "Profils, messages, liens étudiants.",
      details: "Crée ton profil, connecte avec d'autres étudiants de ta ville, trouve des colocataires, organise des sorties.",
      stat: "Parce qu'on est plus forts ensemble.",
      image: "/mockups/MOVE2GETR_4-Photoroom.png",
      gradient: "from-green-primary to-teal-500"
    }
  ];

  return (
    <section id="features" ref={ref} className="py-32 bg-gray-light">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-dark mb-6">
            Ce qui t'attend sur Move2getr
          </h2>
          <p className="text-xl text-gray-medium max-w-3xl mx-auto">
            Trois piliers pour réussir ton parcours étudiant à l'étranger
          </p>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >

              {/* IMAGE Figma à la place du mockup */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className='relative' >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-[700px] rounded-3xl object-cover"
                  />

                  {/* Badge flottant */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-0 -right-2 bg-white rounded-2xl px-6 py-3 shadow-xl"
                  >
                    <p className="text-gray-dark font-semibold text-sm">✨ Bientôt disponible</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* TEXTE */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white shadow-lg`}>
                  {feature.icon}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-gray-dark">
                  {feature.title}
                </h3>

                <p className="text-2xl text-gray-dark font-medium leading-relaxed">
                  {feature.description}
                </p>

                <p className="text-xl text-gray-medium leading-relaxed">
                  {feature.details}
                </p>

                <div className="pt-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-primary">
                    <p className="text-lg text-gray-dark font-semibold">
                      {feature.stat}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
