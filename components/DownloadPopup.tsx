'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // 👈 connexion Supabase

interface DownloadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadPopup({ isOpen, onClose }: DownloadPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ⬅️ loading Supabase
  const [error, setError] = useState(''); // ⬅️ erreurs Supabase

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("Cet email est déjà inscrit.");
        } else {
          setError("Une erreur est survenue. Réessaie.");
        }
        return;
      }

      setIsSubmitted(true);
      setEmail('');

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 
            bg-black/50 backdrop-blur-sm
            flex items-center justify-center
            z-[9999]
          "
        >
          {/* Fermer en cliquant sur le fond */}
          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* POPUP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="
              relative z-10
              w-[90%] max-w-md 
              bg-white rounded-3xl shadow-2xl overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-primary to-orange-light p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <Smartphone className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-3xl font-bold">Bientôt disponible !</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <p className="text-gray-dark text-lg text-center mb-6">
                    L'application Move2getr arrive très prochainement sur :
                  </p>

                  {/* iOS */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 bg-gray-light rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-dark">iOS</p>
                        <p className="text-sm text-gray-medium">App Store</p>
                      </div>
                    </div>

                    {/* Android */}
                    <div className="flex items-center gap-4 p-4 bg-gray-light rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-dark">Android</p>
                        <p className="text-sm text-gray-medium">Play Store</p>
                      </div>
                    </div>
                  </div>

                  {/* Formulaire email (STYLE IDENTIQUE) */}
                  <div className="bg-orange-primary/5 border-2 border-orange-primary/20 rounded-2xl p-6 mb-6">
                    <p className="text-gray-dark font-semibold text-center mb-4">
                      Inscris-toi pour être informé du lancement :
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ton.email@exemple.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-primary focus:outline-none text-gray-dark"
                      />

                      {/* Message d’erreur Supabase (style propre) */}
                      {error && (
                        <p className="text-center text-red-600 text-sm">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="
                          w-full px-6 py-3 
                          bg-gradient-to-r from-orange-primary to-orange-light 
                          text-white font-semibold rounded-xl 
                          hover:shadow-lg transform hover:-translate-y-0.5 
                          transition-all duration-300 
                          disabled:opacity-50 flex items-center justify-center gap-2
                        "
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Inscription...
                          </>
                        ) : (
                          "S'inscrire"
                        )}
                      </button>
                    </form>
                  </div>

                  <p className="text-center text-sm text-gray-medium">
                    🔒 Pas de spam, promis !
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h4 className="text-2xl font-bold text-gray-dark mb-2">
                    Merci !
                  </h4>
                  <p className="text-gray-medium">
                    Tu seras averti dès que l'application sera disponible.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
