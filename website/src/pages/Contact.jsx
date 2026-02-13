import React from 'react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle, MessageSquare, ChevronDown, ArrowRight, Shield, Globe, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import PageSEO from '../components/PageSEO';
import { siteInfo, branches } from '../data/siteData';

const inquiryTypes = [
  'General Inquiry',
  'CCTV Installation',
  'Alarm System',
  'Gate Automation',
  'Electric Fencing',
  'Smart Home Security',
  'Product Purchase',
  'Technical Support',
  'Partnership / B2B',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeBranch, setActiveBranch] = useState(0);
  const formRef = useRef(null);

  /* ── Validation rules ── */
  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'At least 2 characters';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[+]?[\d\s\-()]{7,}$/.test(value.trim())) return 'Enter a valid phone number';
        return '';
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'At least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const buildMessage = () => {
    const lines = [`Hi Gemak Security Shop,`, ''];
    lines.push(`Name: ${formData.name}`);
    lines.push(`Phone: ${formData.phone}`);
    if (formData.email) lines.push(`Email: ${formData.email}`);
    if (formData.inquiryType) lines.push(`Inquiry: ${formData.inquiryType}`);
    lines.push('', `Message:`, formData.message);
    return lines.join('\n');
  };

  const validateForm = () => {
    const allTouched = { name: true, phone: true, email: true, message: true };
    setTouched(allTouched);

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const msg = buildMessage();
    const url = `https://wa.me/263773910305?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted('whatsapp');
    toast.success('Opening WhatsApp with your message!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
      setTouched({});
      setErrors({});
    }, 4000);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const subject = formData.inquiryType
      ? `${formData.inquiryType} — ${formData.name}`
      : `Inquiry from ${formData.name}`;
    const body = buildMessage();
    const mailto = `mailto:${siteInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted('email');
    toast.success('Opening your email client!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
      setTouched({});
      setErrors({});
    }, 4000);
  };

  const inputClass = (name) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/15 ${
      touched[name] && errors[name]
        ? 'border-gemak-red/50 focus:border-gemak-red/70'
        : 'border-white/10 focus:border-gemak-green/30'
    }`;

  return (
    <>
      <PageSEO title="Contact" description="Get in touch with Gemak Security Shop — request a quote, schedule an installation, or visit one of our 9 branches across Zimbabwe." keywords="contact Gemak Security, security installation quote, Zimbabwe security company" />

      {/* Hero — Diagonal Split */}
      <section className="hero-section relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Vision: Professional security team in a modern office, maybe reviewing security plans on a table or monitoring screens */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
            alt="Contact Gemak Security"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gemak-black via-gemak-black/90 to-gemak-black/40" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </div>

        {/* Decorative diagonal */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gemak-black" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-gemak-green/10 border border-gemak-green/20 rounded-full px-4 py-1.5 mb-6">
                <MessageSquare size={14} className="text-gemak-green" />
                <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.2em]">Let's Talk Security</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl leading-[0.9]">
                GET IN<br />
                <span className="text-gradient-green">TOUCH</span>
              </h1>

              <p className="text-white/40 text-lg mt-6 max-w-md">
                Whether you need a single camera or a full enterprise system, our team is ready to help. Free consultations. Zero obligations.
              </p>

              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                <a href={`tel:${siteInfo.phone[0]}`} className="group glass-card rounded-xl p-4 flex items-center gap-3 hover:border-gemak-green/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gemak-green/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-gemak-green" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{siteInfo.phone[0]}</p>
                    <p className="text-white/30 text-xs">Main Line</p>
                  </div>
                </a>
                <a href={`tel:${siteInfo.phone[1]}`} className="group glass-card rounded-xl p-4 flex items-center gap-3 hover:border-gemak-green/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gemak-green/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-gemak-green" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{siteInfo.phone[1]}</p>
                    <p className="text-white/30 text-xs">Alt Line</p>
                  </div>
                </a>
                <a href={`mailto:${siteInfo.email}`} className="group glass-card rounded-xl p-4 flex items-center gap-3 hover:border-gemak-green/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gemak-green/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-gemak-green" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium truncate">{siteInfo.email}</p>
                    <p className="text-white/30 text-xs">Email Us</p>
                  </div>
                </a>
                <a href={siteInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="group glass-card rounded-xl p-4 flex items-center gap-3 hover:border-gemak-green/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gemak-green/10 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} className="text-gemak-green" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">WhatsApp</p>
                    <p className="text-white/30 text-xs">Quick Chat</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div ref={formRef} className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-radial-green opacity-10 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-16 text-center"
                    >
                      <div className="w-16 h-16 bg-gemak-green/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={32} className="text-gemak-green" />
                      </div>
                      <h3 className="font-heading text-2xl uppercase tracking-wider text-white mt-6">
                        {submitted === 'whatsapp' ? 'Opening WhatsApp!' : 'Opening Email!'}
                      </h3>
                      <p className="text-white/40 mt-2 text-sm">
                        {submitted === 'whatsapp'
                          ? 'Your message is pre-filled in WhatsApp. Just hit send!'
                          : 'Your message is pre-filled in your email client. Just hit send!'}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => e.preventDefault()}
                      className="relative space-y-4"
                    >
                      <div>
                        <h2 className="font-heading text-xl uppercase tracking-wider text-white">Send Us a Message</h2>
                        <p className="text-white/30 text-sm mt-1">Free consultation • No obligations</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/40 text-xs font-heading uppercase tracking-wider mb-1.5 block">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={inputClass('name')}
                            placeholder="John Doe"
                          />
                          <AnimatePresence>
                            {touched.name && errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -8, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -8, height: 0 }}
                                className="text-gemak-red text-xs mt-1.5 flex items-center gap-1"
                              >
                                <AlertCircle size={12} /> {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <div>
                          <label className="text-white/40 text-xs font-heading uppercase tracking-wider mb-1.5 block">Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={inputClass('phone')}
                            placeholder="+263 7XX XXX XXX"
                          />
                          <AnimatePresence>
                            {touched.phone && errors.phone && (
                              <motion.p
                                initial={{ opacity: 0, y: -8, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -8, height: 0 }}
                                className="text-gemak-red text-xs mt-1.5 flex items-center gap-1"
                              >
                                <AlertCircle size={12} /> {errors.phone}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div>
                        <label className="text-white/40 text-xs font-heading uppercase tracking-wider mb-1.5 block">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass('email')}
                          placeholder="you@company.co.zw"
                        />
                        <AnimatePresence>
                          {touched.email && errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -8, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: 'auto' }}
                              exit={{ opacity: 0, y: -8, height: 0 }}
                              className="text-gemak-red text-xs mt-1.5 flex items-center gap-1"
                            >
                              <AlertCircle size={12} /> {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label className="text-white/40 text-xs font-heading uppercase tracking-wider mb-1.5 block">What do you need?</label>
                        <div className="relative">
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gemak-green/30 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-gemak-black">Select inquiry type...</option>
                            {inquiryTypes.map(type => (
                              <option key={type} value={type} className="bg-gemak-black">{type}</option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/40 text-xs font-heading uppercase tracking-wider mb-1.5 block">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                          className={`${inputClass('message')} resize-none`}
                          placeholder="Tell us about your security needs..."
                        />
                        <AnimatePresence>
                          {touched.message && errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -8, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: 'auto' }}
                              exit={{ opacity: 0, y: -8, height: 0 }}
                              className="text-gemak-red text-xs mt-1.5 flex items-center gap-1"
                            >
                              <AlertCircle size={12} /> {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <p className="text-white/25 text-xs text-center font-heading uppercase tracking-wider">Choose how to send</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={handleWhatsApp}
                          className="bg-[#25D366] text-white font-heading uppercase text-sm tracking-wider py-3.5 rounded-xl hover:bg-[#1da851] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageSquare size={16} /> WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={handleEmail}
                          className="bg-gemak-green text-gemak-black font-heading uppercase text-sm tracking-wider py-3.5 rounded-xl hover:bg-gemak-green-dark transition-all flex items-center justify-center gap-2"
                        >
                          <Mail size={16} /> Email
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branch Locations — Interactive Map Section */}
      <section className="py-24 bg-gemak-black-light relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <div className="text-center mb-16">
              <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Nationwide Coverage</span>
              <h2 className="font-display text-4xl md:text-6xl mt-2">OUR <span className="text-gradient-green">BRANCHES</span></h2>
              <p className="text-white/40 mt-3 max-w-lg mx-auto">Visit any of our 9 locations across Zimbabwe for personalized service and expert advice.</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Branch List — Scrollable on left */}
            <div className="lg:col-span-2 space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
              {branches.map((branch, idx) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => setActiveBranch(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeBranch === idx
                        ? 'bg-gemak-green/10 border border-gemak-green/20'
                        : 'glass-card hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        activeBranch === idx ? 'bg-gemak-green text-gemak-black' : 'bg-white/5 text-white/30'
                      }`}>
                        <MapPin size={14} />
                      </div>
                      <div>
                        <h3 className={`font-heading text-sm uppercase tracking-wider ${
                          activeBranch === idx ? 'text-gemak-green' : 'text-white'
                        }`}>
                          {branch.name}
                          {branch.isHQ && <span className="ml-2 text-[10px] bg-gemak-green/20 text-gemak-green px-2 py-0.5 rounded-full">HQ</span>}
                        </h3>
                        <p className="text-white/30 text-xs mt-1">{branch.address}</p>
                        <p className="text-white/40 text-xs mt-0.5">{branch.phone}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Map / Branch Detail — Right side */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBranch}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl overflow-hidden h-full"
                >
                  {/* Map Embed — Vision: Actual Google Maps embed showing the branch location */}
                  <div className="aspect-video bg-gemak-black-light relative">
                    <iframe
                      title={`${branches[activeBranch].name || branches[activeBranch].city} location`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(branches[activeBranch].address + ', Zimbabwe')}&output=embed`}
                      className="w-full h-full border-0 dark-map"
                      loading="lazy"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-t-2xl" />
                  </div>

                  {/* Branch Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-xl uppercase tracking-wider text-white">
                          {branches[activeBranch].name}
                        </h3>
                        <p className="text-white/30 text-sm mt-1">{branches[activeBranch].address}</p>
                      </div>
                      {branches[activeBranch].isHQ && (
                        <span className="text-[10px] bg-gemak-green text-gemak-black font-heading uppercase tracking-wider px-3 py-1 rounded-full shrink-0">
                          Headquarters
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Phone size={14} className="text-gemak-green shrink-0" />
                        {branches[activeBranch].phone}
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Clock size={14} className="text-gemak-green shrink-0" />
                        Mon - Sat: 8am - 5pm
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Mail size={14} className="text-gemak-green shrink-0" />
                        {siteInfo.email}
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Globe size={14} className="text-gemak-green shrink-0" />
                        gemaksecurity.co.zw
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <a
                        href={`tel:${branches[activeBranch].phone}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase text-xs tracking-wider py-3 rounded-xl hover:bg-gemak-green-dark transition-all"
                      >
                        <Phone size={14} /> Call Branch
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(branches[activeBranch].address + ', Zimbabwe')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-white/60 font-heading uppercase text-xs tracking-wider py-3 rounded-xl hover:bg-white/5 transition-all"
                      >
                        <MapPin size={14} /> Directions
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — Trust Badges */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: '24/7 Support',
                desc: 'Round-the-clock technical assistance for all installed systems. Emergency response within 2 hours.',
              },
              {
                icon: Shield,
                title: 'Certified Experts',
                desc: 'Factory-trained technicians with professional certifications in all major security brands.',
              },
              {
                icon: Globe,
                title: '9 Branches',
                desc: 'Nationwide coverage ensures you\'re never far from expert help. Local teams, local knowledge.',
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="glass-card rounded-2xl p-8 text-center hover:border-gemak-green/20 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gemak-green/10 flex items-center justify-center mx-auto">
                    <item.icon size={24} className="text-gemak-green" />
                  </div>
                  <h3 className="font-heading text-lg uppercase tracking-wider text-white mt-5">{item.title}</h3>
                  <p className="text-white/30 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
