import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

export default function AnimatedCounter({ value, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  const num = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || num === null) return;
    const controls = animate(0, num, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.round(v).toString());
      },
    });
    return controls.stop;
  }, [inView, num]);

  if (num === null) return <span ref={ref} className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {inView ? display + suffix : '0' + suffix}
    </span>
  );
}
