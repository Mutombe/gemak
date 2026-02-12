import React from 'react';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 35, stiffness: 500 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 500 });
  const ringX = useSpring(mouseX, { damping: 18, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 18, stiffness: 150 });

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;
    setEnabled(true);

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-hover]')) {
        setHovering(true);
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-hover]')) {
        setHovering(false);
      }
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot — fast, precise */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: hovering ? 48 : 8,
            height: hovering ? 48 : 8,
            opacity: visible ? (hovering ? 0.12 : 0.7) : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-full bg-gemak-green"
        />
      </motion.div>

      {/* Outer ring — slow, trailing */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 36,
            height: hovering ? 64 : 36,
            opacity: visible ? (hovering ? 0.15 : 0.12) : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-full border border-gemak-green/30"
        />
      </motion.div>
    </>
  );
}
