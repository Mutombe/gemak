import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Target, Eye, Heart, Award, Users, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import PageSEO from '../components/PageSEO';
import { stats, branches } from '../data/siteData';

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const timeline = [
    { year: '2009', title: 'Founded in Harare', desc: 'Gemak Security Shop opens its first branch at 59 Central Avenue, Harare.' },
    { year: '2012', title: 'Expansion Begins', desc: 'Opened branches in Bulawayo and Chitungwiza to serve growing demand.' },
    { year: '2015', title: 'Product Range Growth', desc: 'Became authorized distributors for Hikvision and Dahua camera systems.' },
    { year: '2018', title: '5 Branches Strong', desc: 'Expanded to Gweru, Mutare and Chinhoyi, establishing nationwide presence.' },
    { year: '2021', title: 'Smart Home Integration', desc: 'Launched smart home security solutions and IoT-connected systems.' },
    { year: '2024', title: '9 Branches Nationwide', desc: 'Now serving Zimbabwe from 9 strategic locations with 10,000+ installations.' },
  ];

  const values = [
    { icon: Shield, title: 'Integrity', desc: 'Transparent pricing, honest assessments, and ethical business practices in everything we do.' },
    { icon: Award, title: 'Excellence', desc: 'Only the highest quality products and installation standards for our clients.' },
    { icon: Users, title: 'Customer First', desc: 'Every solution is tailored to meet the unique security needs of each client.' },
    { icon: Heart, title: 'Community', desc: 'Committed to making Zimbabwe safer, one installation at a time.' },
  ];

  return (
    <>
      <PageSEO title="About Us" description="Learn about Gemak Security Shop — Zimbabwe's trusted security solutions provider since 2009. Our mission, values, history, and nationwide presence." />

      {/* Hero — Split Layout */}
      <section className="hero-section relative min-h-[70vh] flex items-end overflow-hidden">
        {/* BG Image — Vision: Close-up of a CCTV camera lens with dramatic lighting showing reflection */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=80" alt="Security camera" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-gemak-black/70 to-gemak-black/40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Our Story</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mt-2 leading-[0.9]">
              ABOUT <span className="text-gradient-green">GEMAK</span>
            </h1>
            <p className="text-white/40 text-lg mt-4 max-w-xl">
              From a single shop in Harare to Zimbabwe's leading security provider — our journey of harnessing technology for your convenience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision — Asymmetric Cards */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection variant="fadeLeft">
              <div className="glass-card-green rounded-2xl p-8 md:p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gemak-green/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-gemak-green" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl">OUR MISSION</h2>
                <p className="text-white/50 mt-4 leading-relaxed text-lg">
                  To provide accessible, affordable, and advanced security solutions that empower individuals, families, and businesses across Zimbabwe to protect what matters most. We are committed to delivering world-class products and professional installation services through our expanding network of branches.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeRight" delay={0.2}>
              <div className="glass-card rounded-2xl p-8 md:p-10 h-full border-gemak-red/10 hover:border-gemak-red/20 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-gemak-red/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-gemak-red" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl">OUR VISION</h2>
                <p className="text-white/50 mt-4 leading-relaxed text-lg">
                  To be Southern Africa's most trusted security technology company, known for innovation, reliability, and unmatched customer service. We envision a future where every home and business in the region has access to smart, integrated security solutions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-gemak-green relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div>
                  <span className="font-display text-4xl md:text-6xl text-gemak-black"><AnimatedCounter value={stat.value} /></span>
                  <p className="font-heading uppercase tracking-wider text-gemak-black/60 text-sm mt-2">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 bg-gemak-black-light relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" className="text-center mb-16">
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Our Journey</span>
            <h2 className="font-display text-4xl md:text-6xl mt-2">THE <span className="text-gradient-green">TIMELINE</span></h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px">
              <motion.div style={{ height: lineHeight }} className="w-full bg-gemak-green" />
            </div>

            {timeline.map((item, i) => (
              <AnimatedSection key={i} variant={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1} className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <span className="font-display text-5xl text-gemak-green/20">{item.year}</span>
                </div>
                
                {/* Dot */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-gemak-black-light border-2 border-gemak-green flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gemak-green" />
                </div>

                <div className={`flex-1 ${i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <span className="md:hidden font-display text-2xl text-gemak-green/40">{item.year}</span>
                  <h3 className="font-heading text-lg uppercase tracking-wider text-white mt-1">{item.title}</h3>
                  <p className="text-white/40 text-sm mt-2">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" className="text-center mb-16">
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">What Drives Us</span>
            <h2 className="font-display text-4xl md:text-6xl mt-2">OUR <span className="text-gradient-green">VALUES</span></h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div className="glass-card rounded-2xl p-6 text-center hover:border-gemak-green/20 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gemak-green/10 flex items-center justify-center mb-5 group-hover:bg-gemak-green/20 transition-colors">
                    <value.icon size={28} className="text-gemak-green" />
                  </div>
                  <h3 className="font-heading text-lg uppercase tracking-wider text-white">{value.title}</h3>
                  <p className="text-white/30 text-sm mt-3 leading-relaxed">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gemak-black-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="scale">
            <h2 className="font-display text-4xl md:text-6xl">READY TO WORK WITH <span className="text-gradient-green">US?</span></h2>
            <p className="text-white/40 mt-4 max-w-md mx-auto">Let our team of experts design the perfect security solution for your needs.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-gemak-green-dark transition-all">
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border border-white/10 text-white font-heading uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/5 transition-all">
                Our Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
