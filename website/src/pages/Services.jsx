import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, ShieldAlert, DoorOpen, Zap, Shield, Home as HomeIcon, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import PageSEO from '../components/PageSEO';
import { services, siteInfo } from '../data/siteData';

const iconMap = { Camera, ShieldAlert, DoorOpen, Zap, Shield, Home: HomeIcon };

function ServiceBlock({ service, index }) {
  const Icon = iconMap[service.icon] || Shield;
  const isReversed = index % 2 !== 0;
  const images = [
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80",
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
  ];

  return (
    <section id={service.id} className={`py-20 md:py-28 ${index % 2 === 0 ? '' : 'bg-gemak-black-light'} scroll-mt-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}>
          {/* Image Side */}
          <AnimatedSection variant={isReversed ? 'fadeRight' : 'fadeLeft'} className={isReversed ? 'lg:order-2' : ''}>
            <div className="relative group">
              {/* Image — Vision: Each service image should show the actual service/product in action */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              
              {/* Accent Bar */}
              <div className={`absolute ${isReversed ? '-left-3' : '-right-3'} top-1/2 -translate-y-1/2 w-1.5 h-24 bg-gemak-green rounded-full`} />
              
              {/* Corner Accent */}
              <div className={`absolute -bottom-4 ${isReversed ? '-right-4' : '-left-4'} w-20 h-20 border-b-2 ${isReversed ? 'border-r-2 rounded-br-2xl' : 'border-l-2 rounded-bl-2xl'} border-gemak-green/20`} />
            </div>
          </AnimatedSection>

          {/* Content Side */}
          <AnimatedSection variant={isReversed ? 'fadeLeft' : 'fadeRight'} delay={0.2} className={isReversed ? 'lg:order-1' : ''}>
            <div className={isReversed ? 'lg:dir-ltr' : ''} style={{ direction: 'ltr' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gemak-green/10 flex items-center justify-center">
                  <Icon size={24} className="text-gemak-green" />
                </div>
                <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">{service.subtitle}</span>
              </div>

              <h2 className="font-display text-3xl md:text-5xl leading-tight">{service.title.toUpperCase()}</h2>
              <p className="text-white/40 mt-4 leading-relaxed text-lg">{service.description}</p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                    <CheckCircle2 size={16} className="text-gemak-green shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="group inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase text-sm tracking-wider px-6 py-3 rounded-xl hover:bg-gemak-green-dark transition-all">
                  Get a Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`tel:${siteInfo.phone[0]}`} className="inline-flex items-center gap-2 border border-white/10 text-white/60 font-heading uppercase text-sm tracking-wider px-6 py-3 rounded-xl hover:bg-white/5 transition-all">
                  <Phone size={16} /> Call Us
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [hash]);

  return (
    <>
      <PageSEO title="Services" description="Professional security services — CCTV installation, alarm systems, gate automation, electric fencing, guard equipment, and smart home security." keywords="CCTV installation, alarm systems, gate automation, electric fencing, guard services, smart home security, Zimbabwe" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {/* BG — Vision: Wide shot of a modern commercial building with visible security infrastructure */}
        <div className="absolute inset-0">
          <img src="8.jpg" alt="Security services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-gemak-black/70 to-gemak-black/30" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">What We Do</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mt-2">OUR <span className="text-gradient-green">SERVICES</span></h1>
            <p className="text-white/40 text-lg mt-4 max-w-xl">Comprehensive security solutions designed, installed, and maintained by certified professionals.</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="sticky top-16 md:top-20 z-20 bg-gemak-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Shield;
              return (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white/40 hover:text-gemak-green hover:bg-gemak-green/5 text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all"
                >
                  <Icon size={14} /> {service.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Blocks */}
      {services.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} />
      ))}

      {/* Bottom CTA */}
      <section className="py-24 bg-gemak-black-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="scale">
            <h2 className="font-display text-4xl md:text-6xl">NEED A CUSTOM <span className="text-gradient-green">SOLUTION?</span></h2>
            <p className="text-white/40 mt-4 max-w-md mx-auto">Our security experts will design a tailored system that fits your specific requirements and budget.</p>
            <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-10 py-4 rounded-xl hover:bg-gemak-green-dark transition-all">
              Request Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
