import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ExternalLink, ArrowUpRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { siteInfo, branches } from '../data/siteData';
import AnimatedSection from './AnimatedSection';
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Services', path: '/services' },
      { label: 'Security Services', path: '/security-services' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Contact', path: '/contact' },
    ],
    Products: [
      { label: 'CCTV Cameras', path: '/shop?cat=CCTV+Cameras' },
      { label: 'Alarm Systems', path: '/shop?cat=Alarms' },
      { label: 'Self Defense', path: '/shop?cat=Self+Defense' },
      { label: 'All Products', path: '/shop' },
    ],
    Services: [
      { label: 'CCTV Installation', path: '/services#cctv' },
      { label: 'Gate Automation', path: '/services#gate-automation' },
      { label: 'Electric Fencing', path: '/services#electric-fence' },
      { label: 'Smart Home', path: '/services#smart-home' },
    ],
  };

  return (
    <footer className="dark-section relative bg-gemak-black-light border-t border-white/5 pt-16">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-green opacity-30 pointer-events-none" />

      {/* CTA Banner */}
      <AnimatedSection variant="fadeUp" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-0">
          <div className="relative bg-gradient-to-r from-gemak-green to-gemak-green-dark rounded-2xl p-8 md:p-12 overflow-hidden -translate-y-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-gemak-black">Ready to Secure Your Property?</h3>
                <p className="text-gemak-black/70 mt-2 font-medium">Get a free consultation and quotation from our security experts.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="flex items-center justify-center gap-2 bg-gemak-black text-white font-heading uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-gemak-black-light transition-all duration-300 hover:shadow-xl">
                  Get a Quote <ArrowUpRight size={18} />
                </Link>
                <a href={`tel:${siteInfo.phone[0]}`} className="flex items-center justify-center gap-2 bg-white/20 text-gemak-black font-heading uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-white/30 transition-all">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/light-logo.png"
                alt="Gemak Security Shop"
                className="h-12 w-auto object-contain"
                loading="eager"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Zimbabwe's leading security solutions provider with 9 branches nationwide. 
              Harnessing technology for your convenience since 2009.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Facebook, href: siteInfo.social.facebook },
                { icon: Instagram, href: siteInfo.social.instagram },
                { icon: FaXTwitter, href: siteInfo.social.twitter },
                { icon: Linkedin, href: siteInfo.social.linkedin },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-gemak-green hover:bg-gemak-green/10 transition-all">
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <a href={`tel:${siteInfo.phone[0]}`} className="flex items-center gap-2 text-white/40 hover:text-gemak-green transition-colors">
                <Phone size={14} /> {siteInfo.phone[0]}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2 text-white/40 hover:text-gemak-green transition-colors">
                <Mail size={14} /> {siteInfo.email}
              </a>
              <p className="flex items-center gap-2 text-white/40">
                <MapPin size={14} /> {siteInfo.address}
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading uppercase tracking-wider text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-white/35 text-sm hover:text-gemak-green transition-colors duration-200 flex items-center gap-1 group">
                      {link.label}
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Branches Marquee */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-center text-xs text-white/20 font-heading uppercase tracking-widest mb-4">Our Branches Nationwide</p>
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...branches, ...branches].map((branch, i) => (
                <span key={i} className="flex items-center gap-2 text-white/25 text-sm">
                  <MapPin size={12} className="text-gemak-green/40" />
                  {branch.city}
                  {branch.isHQ && <span className="text-gemak-green/60 text-[10px]">HQ</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>&copy; {currentYear} Gemak Security Shop. All rights reserved. Website by <a href="https://bitstudio.co.zw" target="_blank" rel="noopener noreferrer" className="text-gemak-green hover:text-gemak-green-light transition-colors">Bit Studio ZW</a></p>
          <div className="flex items-center gap-4">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'privacy' }))} className="hover:text-gemak-green transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'terms' }))} className="hover:text-gemak-green transition-colors cursor-pointer">Terms of Use</button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'cookies' }))} className="hover:text-gemak-green transition-colors cursor-pointer">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}