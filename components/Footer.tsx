'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { 
      icon: <Instagram className="w-5 h-5" />, 
      link: 'https://instagram.com/move2getr', 
      label: 'Instagram' 
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      link: 'https://linkedin.com/company/move2getr', 
      label: 'LinkedIn' 
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      link: 'https://facebook.com/move2getr', 
      label: 'Facebook' 
    },
    { 
      icon: <FaTiktok className="w-6 h-6" />, 
      name: 'TikTok', 
      link: 'https://tiktok.com/@move2getr', 
      color: 'hover:text-black' 
    },
  ];

  return (
    <footer className="bg-gray-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold gradient-text">
              MOVE2GETR
            </h3>
            <p className="text-gray-400 leading-relaxed">
              La communauté des étudiants africains à l'étranger
            </p>
            <p className="text-gray-500 text-sm">
              Simplifie ton parcours, connecte avec ta communauté.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Liens rapides
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#mission" className="text-gray-400 hover:text-orange-primary transition-colors">
                  Notre mission
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-orange-primary transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-orange-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-primary transition-colors">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Restons connectés
            </h4>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Mail className="w-5 h-5" />
              <a href="mailto:contact@move2getr.com" className="hover:text-orange-primary transition-colors">
                move2getr@gmail.com
              </a>
            </div>
            
            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Move2getr – Tous droits réservés
            </p>
            <p className="text-gray-600 text-sm">
              Fait avec ❤️ pour les étudiants africains
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}