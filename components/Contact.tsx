'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Instagram, Linkedin, Facebook, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: <Instagram className="w-5 h-5" />, link: 'https://instagram.com/move2getr' },
    { icon: <Linkedin className="w-5 h-5" />, link: 'https://linkedin.com/company/move2getr' },
    { icon: <Facebook className="w-5 h-5" />, link: 'https://facebook.com/move2getr' },
    { icon: <FaTiktok className="w-5 h-5" />, link: 'https://tiktok.com/@move2getr' },
  ];

  return (
    <section id="contact" ref={ref} className="py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-dark mb-6">
            Restons en contact 
          </h2>
          <p className="text-xl text-gray-medium">
            Une question ? Une suggestion ? Écris-nous !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Nom */}
              <div>
                <label className="block text-lg font-semibold text-gray-dark mb-2">Nom</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-primary transition-colors text-gray-dark text-lg"
                  placeholder="Ton nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-semibold text-gray-dark mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-primary transition-colors text-gray-dark text-lg"
                  placeholder="ton.email@exemple.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-semibold text-gray-dark mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-primary transition-colors text-gray-dark text-lg resize-none"
                  placeholder="Ton message..."
                />
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-light text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Envoyer
                  </>
                )}
              </button>

              {/* MESSAGE SUCCESS */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-primary/10 border-2 border-green-primary text-green-primary px-6 py-4 rounded-2xl text-center font-semibold"
                >
                  Message envoyé avec succès !
                </motion.div>
              )}

              {/* MESSAGE ERREUR */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border-2 border-red-500 text-red-600 px-6 py-4 rounded-2xl text-center font-semibold"
                >
                  Une erreur est survenue. Réessaie.
                </motion.div>
              )}

            </form>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Email direct */}
            <div className="bg-gradient-to-br from-orange-primary/5 to-blue-primary/5 rounded-3xl p-8 border border-orange-primary/10">
              <h3 className="text-2xl font-bold text-gray-dark mb-4">Email direct</h3>
              <a href="mailto:contact@move2getr.com" className="text-xl text-orange-primary font-semibold hover:underline">
                move2getr@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div className="bg-gradient-to-br from-blue-primary/5 to-purple-500/5 rounded-3xl p-8 border border-blue-primary/10">
              <h3 className="text-2xl font-bold text-gray-dark mb-6">Retrouve-nous sur :</h3>
              <div className="flex flex-wrap gap-4">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.link}
                    target="_blank"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-dark flex items-center"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-orange-primary to-orange-light rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Rejoins l'aventure !</h3>
              <p className="text-lg mb-6 opacity-95">
                Sois informé du lancement et accède à la bêta en avant-première.
              </p>
              <button className="w-full px-6 py-3 bg-white text-orange-primary font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all">
                Rejoindre la liste d'attente
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
