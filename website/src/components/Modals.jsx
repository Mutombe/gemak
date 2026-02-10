import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, FileText, Scale } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = localStorage.getItem('gemak-cookies-accepted');
      if (!accepted) setVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem('gemak-cookies-accepted', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="bg-gemak-black-light border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gemak-green/10 flex items-center justify-center shrink-0">
                <Cookie size={20} className="text-gemak-green" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-white text-sm uppercase tracking-wider">Cookie Notice</h3>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">
                  We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                  By continuing to browse, you agree to our use of cookies.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={accept} className="bg-gemak-green text-gemak-black font-heading uppercase text-xs tracking-wider px-5 py-2 rounded-lg hover:bg-gemak-green-dark transition-colors">
                    Accept All
                  </button>
                  <button onClick={accept} className="text-white/40 text-xs hover:text-white transition-colors px-3 py-2">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PolicyModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('privacy');

  useEffect(() => {
    const handler = (e) => {
      setType(e.detail);
      setOpen(true);
    };
    window.addEventListener('openPolicy', handler);
    return () => window.removeEventListener('openPolicy', handler);
  }, []);

  const policies = {
    privacy: {
      icon: Shield,
      title: 'Privacy Policy',
      content: `Gemak Security Shop ("we", "us", or "our") is committed to protecting your personal information and your right to privacy.

Information We Collect: We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us. This includes names, phone numbers, email addresses, mailing addresses, and billing information.

How We Use Your Information: We use personal information collected via our website for business purposes including processing your orders, managing your account, sending you marketing communications (with your consent), responding to your inquiries, and improving our services.

Information Sharing: We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. We may share your information with service providers who assist us in operating our website and conducting our business.

Data Security: We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.

Your Rights: You have the right to access, correct, update, or request deletion of your personal information. You may contact us at info@gemaksecurity.co.zw to exercise these rights.

Contact Us: If you have questions about this privacy policy, please contact us at info@gemaksecurity.co.zw or visit our headquarters at 59 Central Avenue, Harare, Zimbabwe.`
    },
    terms: {
      icon: FileText,
      title: 'Terms of Use',
      content: `Welcome to Gemak Security Shop. By accessing or using our website, you agree to be bound by these Terms of Use.

Use of Website: This website is intended for users who are at least 18 years of age. By using this website, you represent and warrant that you are of legal age.

Products and Services: All products and services displayed on this website are subject to availability. We reserve the right to discontinue any product or service at any time. Prices are subject to change without notice.

Intellectual Property: All content on this website, including text, graphics, logos, images, and software, is the property of Gemak Security Shop and is protected by intellectual property laws.

Limitation of Liability: Gemak Security Shop shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or services.

Warranty Disclaimer: Products are sold with manufacturer warranties where applicable. Installation services carry a 12-month workmanship guarantee. Self-defense products must be used in accordance with Zimbabwean law.

Governing Law: These terms shall be governed by and construed in accordance with the laws of Zimbabwe.

Contact: For questions regarding these terms, contact us at info@gemaksecurity.co.zw.`
    },
    cookies: {
      icon: Cookie,
      title: 'Cookie Policy',
      content: `This Cookie Policy explains how Gemak Security Shop uses cookies and similar tracking technologies on our website.

What Are Cookies: Cookies are small text files placed on your device when you visit our website. They help us recognize your device and remember certain information about your visit.

Types of Cookies We Use:
Essential Cookies — Required for the website to function properly. These cannot be disabled.
Analytics Cookies — Help us understand how visitors interact with our website by collecting and reporting information anonymously.
Marketing Cookies — Used to track visitors across websites to display relevant advertisements.

Managing Cookies: You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site.

Third-Party Cookies: We may use third-party services such as Google Analytics that may place cookies on your device. These are governed by the respective third party's privacy policy.

Changes to This Policy: We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.

Contact: If you have questions about our use of cookies, please contact us at info@gemaksecurity.co.zw.`
    },
  };

  const policy = policies[type] || policies.privacy;
  const Icon = policy.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-full max-w-2xl max-h-[80vh] bg-gemak-black-light border border-white/10 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gemak-green/10 flex items-center justify-center">
                  <Icon size={20} className="text-gemak-green" />
                </div>
                <h2 className="font-heading text-xl uppercase tracking-wider text-white">{policy.title}</h2>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] text-white/60 text-sm leading-relaxed whitespace-pre-line">
              {policy.content}
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end">
              <button onClick={() => setOpen(false)} className="bg-gemak-green text-gemak-black font-heading uppercase text-xs tracking-wider px-6 py-2.5 rounded-lg hover:bg-gemak-green-dark transition-colors">
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
