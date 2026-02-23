import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, ShieldCheck, ShieldAlert, Siren, Car, Route,
  Users, UserCheck, Star, Crown, ClipboardCheck, Search,
  Bell, Radio, Camera, Eye, ArrowRight, CheckCircle2, Phone,
  Clock, MapPin, Award, BadgeCheck
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import PageSEO from '../components/PageSEO';
import { siteInfo } from '../data/siteData';

const securityServices = [
  {
    icon: ShieldCheck,
    title: 'Guarding Services',
    description: 'Static guards for residential, commercial, and industrial properties. 24/7 protection with trained and vetted security officers who safeguard your premises around the clock.',
    features: ['Residential Guards', 'Commercial Security', 'Industrial Protection', '24/7 Coverage'],
  },
  {
    icon: Siren,
    title: 'Armed Response',
    description: 'Rapid armed response teams dispatched within minutes of alarm activation. GPS-tracked vehicles and highly trained response officers ensure swift intervention.',
    features: ['Rapid Dispatch', 'GPS-Tracked Vehicles', 'Trained Officers', 'Alarm Integration'],
  },
  {
    icon: Car,
    title: 'Mobile Patrols',
    description: 'Regular scheduled and random patrols covering neighborhoods, industrial parks, and commercial districts. Visible deterrence with documented patrol logs.',
    features: ['Scheduled Patrols', 'Random Routes', 'Neighborhood Coverage', 'Patrol Reports'],
  },
  {
    icon: Users,
    title: 'Event Security',
    description: 'Professional crowd management and security for corporate events, concerts, weddings, and conferences. Tailored security plans for events of any scale.',
    features: ['Crowd Management', 'Access Control', 'Corporate Events', 'Concert Security'],
  },
  {
    icon: Crown,
    title: 'VIP / Executive Protection',
    description: 'Close protection officers for high-profile individuals, corporate executives, and dignitaries. Discreet, professional personal security at all times.',
    features: ['Close Protection', 'Executive Security', 'Dignitary Protection', 'Travel Security'],
  },
  {
    icon: ClipboardCheck,
    title: 'Risk Assessment & Consulting',
    description: 'Comprehensive security audits, vulnerability assessments, and tailored security solutions. Expert analysis to identify and mitigate potential threats.',
    features: ['Security Audits', 'Vulnerability Analysis', 'Tailored Solutions', 'Compliance Review'],
  },
  {
    icon: Bell,
    title: 'Alarm Monitoring',
    description: '24/7 alarm monitoring and response center, integrated with all major alarm systems. Immediate verification and dispatch protocols for every alert.',
    features: ['24/7 Monitoring', 'Multi-System Support', 'Instant Alerts', 'Dispatch Protocols'],
  },
  {
    icon: Camera,
    title: 'CCTV Monitoring',
    description: 'Real-time video surveillance monitoring from our centralized control room. Proactive threat detection with trained surveillance operators on duty around the clock.',
    features: ['Live Monitoring', 'Control Room', 'Threat Detection', 'Incident Recording'],
  },
];

const trustPoints = [
  {
    icon: BadgeCheck,
    title: 'Licensed & Compliant',
    description: 'Fully licensed and compliant with all national security regulations and industry standards.',
  },
  {
    icon: Award,
    title: 'Trained Personnel',
    description: 'All security officers undergo rigorous vetting, training, and continuous professional development.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Coverage',
    description: 'Strategic deployment across Zimbabwe with rapid mobilization capabilities in every region.',
  },
  {
    icon: Clock,
    title: '24/7 Operations',
    description: 'Our control rooms and response teams operate around the clock, 365 days a year without interruption.',
  },
];

const statsData = [
  { value: '500+', label: 'Guards Deployed' },
  { value: '24/7', label: 'Operations' },
  { value: '9', label: 'Control Centers' },
  { value: '15+', label: 'Years Experience' },
];

/* Image data for the showcase gallery */
const showcaseImages = [
  { src: '/29.jpeg', alt: 'Gemak security officers on duty', label: 'On-Site Guarding' },
  { src: '/30.jpeg', alt: 'Gemak Security Shop storefront', label: 'Security Equipment' },
  { src: '/31.jpeg', alt: 'Gemak Security Shop product display', label: 'Technology Solutions' },
  { src: '/32.jpeg', alt: 'Gemak armed response team with patrol vehicle', label: 'Armed Response' },
  { src: '/33.jpeg', alt: 'Gemak security personnel on patrol', label: 'Patrol Operations' },
];

export default function SecurityServicesPage() {
  return (
    <>
      <PageSEO
        title="Security Services"
        description="Gemak Security Services — professional security guarding, armed response, mobile patrols, event security, VIP protection, risk assessment, alarm monitoring, and CCTV monitoring across Zimbabwe."
        keywords="security guards, armed response, mobile patrols, event security, VIP protection, CCTV monitoring, alarm monitoring, Zimbabwe security services, Gemak"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-section relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image with Ken Burns */}
        <div className="absolute inset-0">
          <img
            src="/32.jpeg"
            alt="Gemak armed response officers"
            className="absolute inset-0 w-full h-full object-cover object-top animate-ken-burns"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gemak-black via-gemak-black/90 to-gemak-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-transparent to-gemak-black/40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Animated accent lines */}
        <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/15 to-transparent" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/8 to-transparent" />
        <div className="absolute top-0 left-[85%] w-px h-full bg-gradient-to-b from-transparent via-gemak-green/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left -- Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gemak-green/10 border border-gemak-green/20 rounded-full px-4 py-1.5 mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-gemak-green animate-pulse" />
                <span className="text-gemak-green text-xs font-heading uppercase tracking-wider">Professional Security Division</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide"
              >
                <span className="text-white">GEMAK</span>
                <br />
                <span className="text-gradient-green">SECURITY</span>
                <br />
                <span className="text-white">SERVICES</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-6 text-white/50 text-lg md:text-xl max-w-lg leading-relaxed lg:mx-0 mx-auto"
              >
                Comprehensive, professional security solutions — from on-the-ground guarding
                to 24/7 monitoring and rapid armed response across Zimbabwe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-8 flex flex-wrap gap-4 lg:justify-start justify-center"
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gemak-green/20"
                >
                  <span className="relative z-10">Request Assessment</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gemak-green-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <a
                  href={`tel:${siteInfo.phone[0]}`}
                  className="group inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-heading uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Phone size={18} /> Call Us Now
                </a>
              </motion.div>
            </div>

            {/* Right -- Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-gemak-green/10 blur-3xl rounded-full scale-150" />
                <img
                  src="/GEMAK SECURITY SERVICES LOGO.png"
                  alt="Gemak Security Services"
                  className="h-48 md:h-64 lg:h-72 w-auto relative z-10 drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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

      {/* ═══════════════ ABOUT / WHO WE ARE ═══════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection variant="fadeLeft">
              <div className="relative">
                <div className="glass-card-green rounded-2xl p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-gemak-green/10 flex items-center justify-center mb-6">
                    <Shield size={28} className="text-gemak-green" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl">WHO WE <span className="text-gradient-green">ARE</span></h2>
                  <p className="text-white/50 mt-4 leading-relaxed text-lg">
                    Gemak Security Services is the professional security guarding division of Gemak,
                    dedicated to delivering world-class physical and electronic security solutions across Zimbabwe.
                  </p>
                  <p className="text-white/40 mt-4 leading-relaxed">
                    Backed by over 15 years of industry expertise, our team of licensed, trained, and vetted security professionals
                    protects residential estates, commercial properties, industrial complexes, and high-profile individuals.
                    From armed response and mobile patrols to 24/7 control room monitoring, we combine human expertise with
                    cutting-edge technology to deliver uncompromising protection.
                  </p>
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-gemak-green/20 rounded-br-2xl" />
              </div>
            </AnimatedSection>

            {/* Right -- Dual image composition with trust points */}
            <AnimatedSection variant="fadeRight" delay={0.2}>
              <div className="relative">
                {/* Primary image -- security officers on site */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/29.jpeg"
                    alt="Gemak security officers on duty"
                    className="w-full aspect-[4/3] object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gemak-black/80 via-gemak-black/20 to-transparent rounded-2xl" />
                </div>

                {/* Trust points overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {trustPoints.map((point, i) => (
                      <div key={i} className="bg-black/40 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5">
                        <point.icon size={18} className="text-gemak-green mx-auto mb-2" />
                        <h3 className="font-heading text-xs uppercase tracking-wider text-white">{point.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inset secondary image -- patrol personnel */}
                <div className="absolute -bottom-6 -right-6 w-36 md:w-44 rounded-xl overflow-hidden border-4 border-gemak-black shadow-2xl">
                  <img
                    src="/33.jpeg"
                    alt="Gemak security personnel on patrol"
                    className="w-full aspect-square object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMAGE SHOWCASE STRIP ═══════════════ */}
      <section className="py-16 md:py-20 bg-gemak-black-light relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" className="text-center mb-12">
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Our Work In Action</span>
            <h2 className="font-display text-3xl md:text-4xl mt-2">
              PROVEN <span className="text-gradient-green">PROTECTION</span>
            </h2>
            <p className="text-white/30 mt-3 max-w-xl mx-auto text-sm">
              From armed response teams and on-site guarding to security equipment solutions,
              see Gemak Security Services at work across Zimbabwe.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4" staggerDelay={0.08}>
            {showcaseImages.map((img, i) => (
              <StaggerItem key={i}>
                <div className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-default">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gemak-black via-gemak-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  {/* Green accent line at top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gemak-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-heading text-xs uppercase tracking-wider text-white/90">{img.label}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════ SERVICES GRID ═══════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-green opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" className="text-center mb-16">
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">What We Offer</span>
            <h2 className="font-display text-4xl md:text-6xl mt-2">
              OUR <span className="text-gradient-green">SERVICES</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-2xl mx-auto">
              From frontline guarding to high-tech surveillance monitoring, we deliver end-to-end security
              solutions tailored to your unique requirements.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {securityServices.map((service, i) => (
              <StaggerItem key={i}>
                <div className="group h-full glass-card rounded-2xl p-6 md:p-8 overflow-hidden hover:border-gemak-green/30 transition-all duration-500 relative">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gemak-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="w-14 h-14 rounded-2xl bg-gemak-green/10 flex items-center justify-center mb-5 group-hover:bg-gemak-green/20 transition-colors"
                    >
                      <service.icon size={24} className="text-gemak-green" />
                    </motion.div>

                    <h3 className="font-heading text-lg uppercase tracking-wider text-white group-hover:text-gemak-green transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-white/30 text-sm mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-5 space-y-2">
                      {service.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-white/40 text-xs">
                          <CheckCircle2 size={12} className="text-gemak-green shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════ FULL-WIDTH IMAGE DIVIDER ═══════════════ */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src="/30.jpeg"
          alt="Gemak Security Shop storefront"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gemak-black via-gemak-black/70 to-gemak-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gemak-black/60 via-transparent to-gemak-black/60" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <AnimatedSection variant="fadeLeft">
            <div className="max-w-lg">
              <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Gemak Security Shop</span>
              <h2 className="font-display text-3xl md:text-5xl mt-2 text-white">
                SECURITY <span className="text-gradient-green">EQUIPMENT</span>
              </h2>
              <p className="text-white/50 mt-3 leading-relaxed">
                Visit our fully stocked security shop for CCTV cameras, alarm systems, guard equipment,
                and professional security technology solutions.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE OUR SERVICES ═══════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left -- Content */}
            <div>
              <AnimatedSection variant="fadeLeft">
                <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Why Choose Us</span>
                <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
                  SECURITY YOU CAN <span className="text-gradient-green">RELY ON</span>
                </h2>
                <p className="text-white/40 mt-4 leading-relaxed">
                  When it comes to protecting your people, property, and assets, there is no room for compromise.
                  Gemak Security Services combines seasoned expertise with modern technology to deliver a
                  level of protection that stands apart from the rest.
                </p>
              </AnimatedSection>

              <StaggerContainer className="mt-10 space-y-5" staggerDelay={0.1}>
                {[
                  { icon: ShieldCheck, title: 'Licensed & Fully Compliant', desc: 'We operate under full regulatory compliance with all necessary permits, licenses, and insurance coverage.' },
                  { icon: Award, title: 'Rigorously Trained Personnel', desc: 'Every officer is screened, vetted, and trained to the highest industry standards with regular refresher programs.' },
                  { icon: Eye, title: 'Advanced Technology Integration', desc: 'GPS tracking, digital patrol verification, live CCTV feeds, and AI-powered threat detection working together.' },
                  { icon: Radio, title: 'Centralized Command & Control', desc: 'Our 24/7 control rooms coordinate all operations with real-time communication across all deployed teams.' },
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-4 group">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="w-12 h-12 rounded-xl bg-gemak-green/10 flex items-center justify-center shrink-0 group-hover:bg-gemak-green/20 transition-colors"
                      >
                        <item.icon size={22} className="text-gemak-green" />
                      </motion.div>
                      <div>
                        <h3 className="font-heading text-lg uppercase tracking-wider text-white">{item.title}</h3>
                        <p className="text-white/30 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Right -- Image composition */}
            <AnimatedSection variant="fadeRight" delay={0.2}>
              <div className="relative">
                {/* Main image -- shop window display */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/31.jpeg"
                    alt="Gemak Security Shop product display"
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Secondary image -- armed response, offset overlap */}
                <div className="absolute -bottom-8 -left-8 w-48 md:w-56 rounded-xl overflow-hidden border-4 border-gemak-black shadow-2xl">
                  <img
                    src="/32.jpeg"
                    alt="Gemak armed response team"
                    className="w-full aspect-square object-cover object-top"
                    loading="lazy"
                  />
                </div>

                {/* Logo badge -- top right */}
                <div className="absolute -top-4 -right-4 glass-card-green rounded-xl p-3 flex items-center gap-3">
                  <img
                    src="/GEMAK SECURITY SERVICES LOGO.png"
                    alt="Gemak Security Services"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                  <div>
                    <span className="font-display text-lg text-gemak-green">15+</span>
                    <p className="text-white/40 text-[10px] font-heading uppercase tracking-wider">Years</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="py-16 bg-gemak-green relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {statsData.map((stat, i) => (
              <StaggerItem key={i}>
                <div>
                  <span className="font-display text-4xl md:text-6xl text-gemak-black">{stat.value}</span>
                  <p className="font-heading uppercase tracking-wider text-gemak-black/60 text-sm mt-2">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="py-24 bg-gemak-black-light relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0">
          <img
            src="/33.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
            loading="lazy"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection variant="scale">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="/GEMAK SECURITY SERVICES LOGO.png"
                alt="Gemak Security Services"
                className="h-16 md:h-20 w-auto opacity-60"
                loading="lazy"
              />
            </div>
            <h2 className="font-display text-4xl md:text-6xl">REQUEST A SECURITY <span className="text-gradient-green">ASSESSMENT</span></h2>
            <p className="text-white/40 mt-4 max-w-lg mx-auto">
              Let our security experts evaluate your property and design a comprehensive protection
              plan tailored to your specific needs and budget.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-gemak-green-dark transition-all hover:shadow-xl hover:shadow-gemak-green/20"
              >
                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${siteInfo.phone[0]}`}
                className="inline-flex items-center gap-2 border border-white/10 text-white font-heading uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/5 transition-all"
              >
                <Phone size={18} /> {siteInfo.phone[0]}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
