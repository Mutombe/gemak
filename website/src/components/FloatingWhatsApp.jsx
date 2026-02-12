import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { siteInfo } from '../data/siteData';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener('scroll', onScroll);
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (visible && tooltip) {
      const t = setTimeout(() => setTooltip(false), 5000);
      return () => clearTimeout(t);
    }
  }, [visible, tooltip]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
        >
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="bg-white text-gemak-black text-sm font-medium px-4 py-2.5 rounded-xl rounded-br-sm shadow-2xl flex items-center gap-2"
              >
                Chat with us
                <button
                  onClick={(e) => { e.preventDefault(); setTooltip(false); }}
                  className="text-black/30 hover:text-black/60 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={siteInfo.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={26} className="text-white" />
            <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
