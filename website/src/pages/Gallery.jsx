import React from 'react';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import PageSEO from '../components/PageSEO';
import { galleryItems } from '../data/siteData';

const categories = ['All', ...new Set(galleryItems.map(item => item.category))];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeCategory);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => setLightboxIndex(prev => (prev + 1) % filtered.length), [filtered.length]);
  const goPrev = useCallback(() => setLightboxIndex(prev => (prev - 1 + filtered.length) % filtered.length), [filtered.length]);

  // Masonry height pattern — alternating tall/short for visual interest
  const getSpanClass = (idx) => {
    const pattern = [
      'row-span-2',   // tall
      'row-span-1',   // short
      'row-span-1',   // short
      'row-span-2',   // tall
      'row-span-1',   // short
      'row-span-2',   // tall
      'row-span-1',   // short
      'row-span-1',   // short
      'row-span-2',   // tall
      'row-span-1',   // short
      'row-span-1',   // short
      'row-span-2',   // tall
    ];
    return pattern[idx % pattern.length];
  };

  return (
    <>
      <PageSEO title="Gallery" description="View our portfolio of completed security installations — CCTV systems, gate automation, electric fencing, and smart home security projects across Zimbabwe." keywords="security installation gallery, CCTV projects, gate automation, electric fencing Zimbabwe" />

      {/* Hero — Cinematic Parallax */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Vision: Dramatic wide-angle shot of a secured estate at dusk with visible CCTV cameras and perimeter lighting */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
            alt="Security installations portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gemak-black/80 via-gemak-black/50 to-gemak-black" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        {/* Floating geometric accents */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-gemak-green/10 rounded-full animate-float" />
        <div className="absolute bottom-32 right-16 w-48 h-48 border border-gemak-green/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gemak-green rounded-full animate-pulse-green" />

        <div className="relative text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-5 py-2 mb-6">
              <div className="w-1.5 h-1.5 bg-gemak-green rounded-full animate-pulse" />
              <span className="text-white/60 text-xs font-heading uppercase tracking-[0.3em]">Our Portfolio</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl">
              <span className="text-gradient-green">PROJECT</span>
              <br />
              GALLERY
            </h1>

            <p className="text-white/30 text-lg mt-6 max-w-lg mx-auto">
              10,000+ installations across Zimbabwe. Here's a glimpse of the security systems we've designed and deployed.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-gemak-green rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 md:top-20 z-20 bg-gemak-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gemak-green text-gemak-black'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="gallery-filter" className="absolute inset-0 bg-gemak-green rounded-full -z-10" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-gemak-black-light border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '10K+', label: 'Installations' },
              { value: '9', label: 'Branches' },
              { value: '500+', label: 'Commercial Projects' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <AnimatedSection key={i} variant="fadeUp" delay={i * 0.1}>
                <div className="text-center">
                  <span className="font-display text-3xl md:text-4xl text-gemak-green">{stat.value}</span>
                  <p className="text-white/30 text-xs font-heading uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] md:auto-rows-[220px] gap-4"
            >
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${getSpanClass(idx)}`}
                  onClick={() => openLightbox(idx)}
                >
                  {/* Vision: Each gallery item should show actual Gemak installations — cameras mounted on walls, automated gates, control rooms, electric fence runs */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-gemak-green text-[10px] font-heading uppercase tracking-[0.2em]">{item.category}</span>
                    <h3 className="text-white font-heading text-lg uppercase tracking-wider mt-1">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      {item.location && (
                        <span className="flex items-center gap-1 text-white/40 text-xs">
                          <MapPin size={10} /> {item.location}
                        </span>
                      )}
                      {item.date && (
                        <span className="flex items-center gap-1 text-white/40 text-xs">
                          <Calendar size={10} /> {item.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-gemak-green/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ZoomIn size={16} className="text-white" />
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gemak-green/0 group-hover:border-gemak-green/40 rounded-tl-lg transition-all duration-300 m-3" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Project Showcase — Full Width */}
      <section className="py-24 bg-gemak-black-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Featured Project</span>
                <h2 className="font-display text-4xl md:text-6xl mt-2">
                  HARARE CBD<br /><span className="text-gradient-green">COMMAND CENTER</span>
                </h2>
                <p className="text-white/40 mt-4 leading-relaxed text-lg">
                  A state-of-the-art 128-camera surveillance system with centralized monitoring, AI-powered analytics, and 24/7 remote access. This project showcases our capability to handle enterprise-grade deployments.
                </p>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { value: '128', label: 'Cameras' },
                    { value: '24/7', label: 'Monitoring' },
                    { value: '4K', label: 'Resolution' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 text-center">
                      <span className="font-display text-2xl text-gemak-green">{stat.value}</span>
                      <p className="text-white/30 text-[10px] font-heading uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="group inline-flex items-center gap-2 mt-8 bg-gemak-green text-gemak-black font-heading uppercase text-sm tracking-wider px-8 py-4 rounded-xl hover:bg-gemak-green-dark transition-all">
                  Start Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Vision: Large control room with multiple monitors showing live CCTV feeds, operators at workstations */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80"
                    alt="Command center installation"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 glass-card-green rounded-xl p-4 max-w-[200px]">
                  <span className="font-display text-3xl text-gemak-green">A+</span>
                  <p className="text-white/60 text-xs mt-1">Security Rating</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-green opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="scale">
            <h2 className="font-display text-4xl md:text-6xl">
              READY TO <span className="text-gradient-green">SECURE</span> YOUR SPACE?
            </h2>
            <p className="text-white/40 mt-4 max-w-md mx-auto">
              Join 10,000+ satisfied clients across Zimbabwe. Get a free security assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link to="/contact" className="group inline-flex items-center justify-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-10 py-4 rounded-xl hover:bg-gemak-green-dark transition-all">
                Free Assessment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 border border-white/10 text-white/60 font-heading uppercase tracking-wider px-10 py-4 rounded-xl hover:bg-white/5 transition-all">
                Browse Products
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button onClick={closeLightbox} className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/5 backdrop-blur rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <X size={24} />
            </button>

            {/* Nav Arrows */}
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 md:left-8 z-10 w-12 h-12 bg-white/5 backdrop-blur rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 md:right-8 z-10 w-12 h-12 bg-white/5 backdrop-blur rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].title}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-heading text-xl uppercase tracking-wider">{filtered[lightboxIndex].title}</h3>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <span className="text-gemak-green text-xs font-heading uppercase tracking-wider">{filtered[lightboxIndex].category}</span>
                  {filtered[lightboxIndex].location && (
                    <span className="flex items-center gap-1 text-white/30 text-xs">
                      <MapPin size={10} /> {filtered[lightboxIndex].location}
                    </span>
                  )}
                </div>
                <p className="text-white/20 text-xs mt-3">{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
