import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Shield, Camera, Zap, DoorOpen, ShieldAlert, Home as HomeIcon, ArrowRight, ArrowUpRight, Star, ChevronRight, Play, CheckCircle2, Phone, MapPin, Eye, Lock, Radio } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import PageSEO from '../components/PageSEO';
import { services, products, testimonials, stats, siteInfo, branches } from '../data/siteData';

const iconMap = { Camera, ShieldAlert, DoorOpen, Zap, Shield, Home: HomeIcon };

/* ═══════════════ HERO ═══════════════ */
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG Image — Vision: Dramatic aerial shot of a modern secured compound at twilight with visible security systems */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558002038-1055907df827?w=1920&q=80"
          alt="Security systems"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gemak-black via-gemak-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-transparent to-gemak-black/30" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Animated Lines */}
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/20 to-transparent" />
      <div className="absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/10 to-transparent" />
      <div className="absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/5 to-transparent" />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gemak-green/10 border border-gemak-green/20 rounded-full px-4 py-1.5 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-gemak-green animate-pulse" />
            <span className="text-gemak-green text-xs font-heading uppercase tracking-wider">Zimbabwe's #1 Security Provider</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide"
          >
            <span className="text-white">PROTECT</span>
            <br />
            <span className="text-white">WHAT</span>{' '}
            <span className="text-gradient-green">MATTERS</span>
            <br />
            <span className="text-gemak-red">MOST</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-white/50 text-lg md:text-xl max-w-lg leading-relaxed"
          >
            Advanced security systems, professional guard equipment, and smart home solutions. 
            Harnessing technology for your convenience across 9 branches nationwide.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/services" className="group relative inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gemak-green/20">
              <span className="relative z-10">Explore Services</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gemak-green-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link to="/shop" className="group inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-heading uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
              Visit Shop <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 flex flex-wrap gap-8 md:gap-12"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl md:text-4xl text-gemak-green">{stat.value}</span>
                <span className="text-white/30 text-xs font-heading uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gemak-green rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════ SERVICES ═══════════════ */
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
                      <div className="w-14 h-14 rounded-2xl bg-gemak-green/10 flex items-center justify-center mb-5 group-hover:bg-gemak-green/20 transition-colors">
                        <Icon size={24} className="text-gemak-green" />
                      </div>
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
                  {/* Image — Vision: Product photography on clean backgrounds */}
                  <div className="aspect-square overflow-hidden bg-white/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Badge */}
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
          <Link to="/shop" className="group inline-flex items-center gap-2 bg-gemak-green/10 border border-gemak-green/20 text-gemak-green font-heading uppercase text-sm tracking-wider px-8 py-3.5 rounded-xl hover:bg-gemak-green hover:text-gemak-black transition-all duration-300">
            Browse All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════ WHY CHOOSE US ═══════════════ */
function WhyChooseUs() {
  const reasons = [
    { icon: Eye, title: "24/7 Surveillance", desc: "Round-the-clock monitoring and support for all installed systems" },
    { icon: Lock, title: "Trusted Since 2009", desc: "Over 15 years of proven security expertise across Zimbabwe" },
    { icon: Radio, title: "9 Branches", desc: "Nationwide coverage from Harare to Kariba, always close to you" },
    { icon: CheckCircle2, title: "Certified Experts", desc: "Factory-trained technicians with Hikvision & Dahua certifications" },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image Composition */}
          <AnimatedSection variant="fadeLeft">
            <div className="relative">
              {/* Main Image — Vision: Security professional monitoring multiple screens in a control room */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80"
                  alt="Security professional"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gemak-black/60 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-gemak-green rounded-2xl p-5 shadow-2xl"
              >
                <div className="text-gemak-black">
                  <span className="font-display text-4xl">98%</span>
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
                    <div className="w-12 h-12 rounded-xl bg-gemak-green/10 flex items-center justify-center shrink-0 group-hover:bg-gemak-green/20 transition-colors">
                      <reason.icon size={22} className="text-gemak-green" />
                    </div>
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

/* ═══════════════ TESTIMONIALS ═══════════════ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
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

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-gemak-green' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
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
                <MapPin size={20} className="mx-auto text-gemak-green mb-2 group-hover:scale-110 transition-transform" />
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
