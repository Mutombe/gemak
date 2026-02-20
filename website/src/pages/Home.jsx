import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Camera, Zap, DoorOpen, ShieldAlert, Home as HomeIcon, ArrowRight, ArrowUpRight, Star, ChevronRight, CheckCircle2, Phone, MapPin, Eye, Lock, Radio, ChevronLeft } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import PageSEO from '../components/PageSEO';
import { services, products, testimonials, stats, siteInfo, branches } from '../data/siteData';

const iconMap = { Camera, ShieldAlert, DoorOpen, Zap, Shield, Home: HomeIcon };

/* ── Ripple utility ── */
function createRipple(e) {
  const el = e.currentTarget;
  const circle = document.createElement('span');
  const d = Math.max(el.clientWidth, el.clientHeight);
  const r = d / 2;
  const rect = el.getBoundingClientRect();
  Object.assign(circle.style, {
    width: `${d}px`, height: `${d}px`,
    left: `${e.clientX - rect.left - r}px`,
    top: `${e.clientY - rect.top - r}px`,
    position: 'absolute', borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    transform: 'scale(0)',
    animation: 'ripple 0.6s ease-out',
    pointerEvents: 'none',
  });
  el.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

/* ── Hero carousel slides ── */
const heroSlides = [
  {
    image: '/38.jpeg',
    badge: "Zimbabwe's #1 Security Provider",
    headline: <>PROTECT<br />WHAT <span className="text-gradient-green">MATTERS</span><br /><span className="text-gemak-red">MOST</span></>,
    subtitle: 'Advanced security systems, professional guard equipment, and smart home solutions. Harnessing technology for your convenience across 9 branches nationwide.',
    cta: { label: 'Explore Services', to: '/services' },
    ctaSecondary: { label: 'Visit Shop', to: '/shop' },
  },
  {
    image: '/25.jpeg',
    badge: 'CCTV & Surveillance Experts',
    headline: <>TOTAL<br /><span className="text-gradient-green">SURVEILLANCE</span><br />SOLUTIONS</>,
    subtitle: 'From 2MP to 5MP, Hikvision to Dahua — HD cameras, NVR kits, PTZ systems, and AI-powered analytics installed by certified professionals.',
    cta: { label: 'Our Cameras', to: '/shop' },
    ctaSecondary: { label: 'Get a Quote', to: '/contact' },
  },
  {
    image: '/16.jpg',
    badge: 'Professional Equipment Supplier',
    headline: <>EQUIP YOUR<br /><span className="text-gradient-green">SECURITY</span><br /><span className="text-gemak-red">TEAM</span></>,
    subtitle: 'Guard uniforms, tactical gear, boots, walkie-talkies, blank guns, and more. Everything your security company needs under one roof.',
    cta: { label: 'Browse Equipment', to: '/shop' },
    ctaSecondary: { label: 'Learn More', to: '/services' },
  },
  {
    image: '/17.jpg',
    badge: '9 Branches Nationwide',
    headline: <>SECURITY<br />MADE <span className="text-gradient-green">ACCESSIBLE</span><br />FOR ALL</>,
    subtitle: 'From Harare to Kariba, from homes to enterprises — affordable, world-class security solutions available at every branch.',
    cta: { label: 'Find a Branch', to: '/contact' },
    ctaSecondary: { label: 'About Us', to: '/about' },
  },
];

/* ═══════════════ HERO CAROUSEL ═══════════════ */
function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveSlide(p => (p + 1) % heroSlides.length), 6000);
  }, []);

  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [resetTimer]);

  const goTo = (idx) => { setActiveSlide(idx); resetTimer(); };
  const goNext = () => goTo((activeSlide + 1) % heroSlides.length);
  const goPrev = () => goTo((activeSlide - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[activeSlide];

  return (
    <section className="hero-section relative min-h-screen flex items-end overflow-hidden">
      {/* BG Images — crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="Gemak Security"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Persistent overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-gemak-black via-gemak-black/85 to-gemak-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-gemak-black/30 to-gemak-black/40" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/15 to-transparent" />
      <div className="absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/8 to-transparent" />
      <div className="absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/5 to-transparent" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gemak-green/10 border border-gemak-green/20 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-gemak-green animate-pulse" />
                <span className="text-gemak-green text-xs font-heading uppercase tracking-wider">{slide.badge}</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide text-white">
                {slide.headline}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-white/50 text-lg md:text-xl max-w-lg leading-relaxed">
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={slide.cta.to}
                  onClick={createRipple}
                  className="group relative inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gemak-green/20"
                >
                  <span className="relative z-10">{slide.cta.label}</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gemak-green-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link
                  to={slide.ctaSecondary.to}
                  onClick={createRipple}
                  className="group relative inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-heading uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {slide.ctaSecondary.label} <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats Row — always visible */}
          <div className="mt-12 flex flex-wrap gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl text-gemak-green">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-white/30 text-xs font-heading uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Carousel Navigation — Bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dots + Progress */}
          <div className="flex items-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                style={{ width: i === activeSlide ? 48 : 12 }}
                aria-label={`Go to slide ${i + 1}`}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full" />
                {i === activeSlide && (
                  <motion.div
                    className="absolute inset-0 bg-gemak-green rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    key={`progress-${activeSlide}`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gemak-green hover:border-gemak-green/30 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gemak-green hover:border-gemak-green/30 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SERVICES — Animated Icons ═══════════════ */
function ServicesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial-green opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <div>
              <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">What We Offer</span>
              <h2 className="font-display text-4xl md:text-6xl mt-2">
                OUR <span className="text-gradient-green">SERVICES</span>
              </h2>
            </div>
            <Link to="/services" className="group inline-flex items-center gap-2 text-white/40 hover:text-gemak-green transition-colors font-heading uppercase text-sm tracking-wider">
              View All Services <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Shield;
            return (
              <StaggerItem key={service.id}>
                <Link to={`/services#${service.id}`} className="group block h-full">
                  <div className="relative h-full glass-card rounded-2xl p-6 md:p-8 overflow-hidden hover:border-gemak-green/30 transition-all duration-500">
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gemak-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      {/* Animated Icon */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="w-14 h-14 rounded-2xl bg-gemak-green/10 flex items-center justify-center mb-5 group-hover:bg-gemak-green/20 transition-colors"
                      >
                        <Icon size={24} className="text-gemak-green" />
                      </motion.div>
                      <h3 className="font-heading text-xl uppercase tracking-wider text-white group-hover:text-gemak-green transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/30 text-sm mt-3 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-gemak-green text-xs font-heading uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════ FEATURED PRODUCTS ═══════════════ */
function FeaturedProducts() {
  const featured = products.filter(p => p.badge).slice(0, 8);

  return (
    <section className="relative py-24 md:py-32 bg-gemak-black-light overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <span className="text-gemak-red text-xs font-heading uppercase tracking-[0.3em]">Featured</span>
            <h2 className="font-display text-4xl md:text-6xl mt-2">
              TOP <span className="text-gradient-red">PRODUCTS</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-md mx-auto">Premium security equipment at unbeatable prices.</p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.08}>
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <Link to={`/shop`} className="group block">
                <div className="relative rounded-2xl overflow-hidden glass-card hover:border-gemak-green/20 transition-all duration-500">
                  <div className="aspect-square overflow-hidden bg-white/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-heading uppercase tracking-wider ${
                      product.badge === 'Premium' ? 'bg-gemak-green text-gemak-black' :
                      product.badge === 'Sale' || product.badge === 'Hot' ? 'bg-gemak-red text-white' :
                      'bg-white/10 backdrop-blur-sm text-white'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gemak-green transition-colors">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-display text-xl text-gemak-green">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-white/20 text-xs line-through">${product.oldPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-gemak-green fill-gemak-green' : 'text-white/10'} />
                      ))}
                      <span className="text-white/20 text-[10px] ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection variant="fadeUp" delay={0.3} className="mt-12 text-center">
          <Link
            to="/shop"
            onClick={createRipple}
            className="group relative inline-flex items-center gap-2 bg-gemak-green/10 border border-gemak-green/20 text-gemak-green font-heading uppercase text-sm tracking-wider px-8 py-3.5 rounded-xl overflow-hidden hover:bg-gemak-green hover:text-gemak-black transition-all duration-300"
          >
            Browse All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════ WHY CHOOSE US — Parallax Image ═══════════════ */
function WhyChooseUs() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const reasons = [
    { icon: Eye, title: "24/7 Surveillance", desc: "Round-the-clock monitoring and support for all installed systems" },
    { icon: Lock, title: "Trusted Since 2009", desc: "Over 15 years of proven security expertise across Zimbabwe" },
    { icon: Radio, title: "9 Branches", desc: "Nationwide coverage from Harare to Kariba, always close to you" },
    { icon: CheckCircle2, title: "Certified Experts", desc: "Factory-trained technicians with Hikvision & Dahua certifications" },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image with Parallax */}
          <AnimatedSection variant="fadeLeft">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <motion.img
                  style={{ y: imageY }}
                  src="/18.jpg"
                  alt="Security professional"
                  className="w-full h-[120%] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gemak-black/60 to-transparent" />
              </div>

              {/* Floating Card — Animated Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-gemak-green rounded-2xl p-5 shadow-2xl"
              >
                <div className="text-gemak-black">
                  <span className="font-display text-4xl"><AnimatedCounter value="98%" /></span>
                  <p className="text-gemak-black/70 text-xs font-heading uppercase tracking-wider mt-1">Client Satisfaction</p>
                </div>
              </motion.div>

              {/* Decorative Border */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gemak-green/30 rounded-tl-3xl" />
            </div>
          </AnimatedSection>

          {/* Right — Content */}
          <div>
            <AnimatedSection variant="fadeRight">
              <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Why Gemak</span>
              <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
                SECURITY YOU CAN <span className="text-gradient-green">TRUST</span>
              </h2>
              <p className="text-white/40 mt-4 leading-relaxed">
                With over a decade of experience and thousands of installations across Zimbabwe,
                Gemak Security Shop has earned the trust of homeowners, businesses, and institutions
                as the nation's premier security provider.
              </p>
            </AnimatedSection>

            <StaggerContainer className="mt-10 space-y-4" staggerDelay={0.1}>
              {reasons.map((reason, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-4 group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="w-12 h-12 rounded-xl bg-gemak-green/10 flex items-center justify-center shrink-0 group-hover:bg-gemak-green/20 transition-colors"
                    >
                      <reason.icon size={22} className="text-gemak-green" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading text-lg uppercase tracking-wider text-white">{reason.title}</h3>
                      <p className="text-white/30 text-sm mt-1">{reason.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ TESTIMONIALS — Swipe Support ═══════════════ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goTo = (index) => {
    setActive(index);
    resetTimer();
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) goTo((active + 1) % testimonials.length);
    else if (info.offset.x > 50) goTo((active - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 md:py-32 bg-gemak-black-light overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Testimonials</span>
          <h2 className="font-display text-4xl md:text-6xl mt-2">
            WHAT OUR <span className="text-gradient-green">CLIENTS</span> SAY
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="text-center select-none cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-gemak-green fill-gemak-green" />
                ))}
              </div>
              <blockquote className="text-white/80 text-lg md:text-2xl font-light leading-relaxed italic">
                "{testimonials[active].text}"
              </blockquote>
              <div className="mt-8">
                <p className="font-heading text-white uppercase tracking-wider">{testimonials[active].name}</p>
                <p className="text-gemak-green text-sm mt-1">{testimonials[active].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots + Swipe Hint */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-gemak-green' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/15 text-xs font-heading uppercase tracking-wider md:hidden">Swipe to navigate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ BRANCHES ═══════════════ */
function BranchesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Nationwide Coverage</span>
          <h2 className="font-display text-4xl md:text-6xl mt-2">
            <span className="text-gradient-green">9 BRANCHES</span> ACROSS ZIMBABWE
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" staggerDelay={0.06}>
          {branches.map((branch, i) => (
            <StaggerItem key={i}>
              <div className={`relative glass-card rounded-xl p-4 text-center hover:border-gemak-green/30 transition-all duration-300 group ${branch.isHQ ? 'border-gemak-green/20' : ''}`}>
                <motion.div whileHover={{ scale: 1.2, y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <MapPin size={20} className="mx-auto text-gemak-green mb-2" />
                </motion.div>
                <h3 className="font-heading text-sm uppercase tracking-wider text-white">{branch.city}</h3>
                {branch.isHQ && (
                  <span className="inline-block mt-1 text-[10px] font-heading uppercase tracking-wider bg-gemak-green/10 text-gemak-green px-2 py-0.5 rounded-full">
                    Headquarters
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function HomePage() {
  return (
    <>
      <PageSEO
        title="Home"
        description="Gemak Security Shop — Zimbabwe's #1 security solutions provider. CCTV, alarms, gate automation, electric fencing, guard equipment. 9 branches nationwide."
        keywords="security, CCTV, cameras, alarms, gate automation, electric fence, Zimbabwe, Harare, Gemak Security"
      />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <FeaturedProducts />
      <TestimonialsSection />
      <BranchesSection />
    </>
  );
}
