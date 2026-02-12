import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CookieConsent, PolicyModal } from './components/Modals';
import PageTransition from './components/PageTransition';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SecurityServices from './pages/SecurityServices';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <ScrollToTop />
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A2E',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'Oswald, sans-serif',
            letterSpacing: '0.05em',
          },
        }}
      />
      <div className="min-h-screen bg-gemak-black text-white font-body overflow-x-hidden">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/security-services" element={<PageTransition><SecurityServices /></PageTransition>} />
              <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
        <CookieConsent />
        <PolicyModal />
      </div>
    </ThemeProvider>
  );
}
