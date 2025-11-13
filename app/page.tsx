'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Features from '@/components/Features';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import DownloadPopup from '@/components/DownloadPopup';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Cette fonction sera appelée depuis Hero pour ouvrir le popup
  if (typeof window !== 'undefined') {
    (window as any).openDownloadPopup = () => setIsPopupOpen(true);
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <Mission />
      <Features />
      <Contact />
      <Footer />
      
      {/* Popup de téléchargement */}
      <DownloadPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </main>
  );
}