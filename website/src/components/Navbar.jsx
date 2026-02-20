import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Phone, MapPin, ChevronDown, Sun, Moon } from 'lucide-react';
import { searchableContent, siteInfo } from '../data/siteData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [location]);

  useEffect(() => {
    if (searchQuery.trim().length < 2) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    const results = searchableContent.filter(item =>
      item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
    );
    setSearchResults(results.slice(0, 6));
  }, [searchQuery]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/security-services', label: 'Security' },
    { path: '/shop', label: 'Shop' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearchSelect = (result) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(result.path);
  };

  /* Theme-aware helper classes */
  const iconBtnClass = `p-2.5 rounded-xl transition-all ${
    isDark
      ? 'text-white/70 hover:text-gemak-green hover:bg-white/5'
      : 'text-gray-500 hover:text-gemak-green hover:bg-gray-100'
  }`;

  return (
    <>
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="bg-gemak-green/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs text-gemak-black font-medium">
            <div className="flex items-center gap-4">
              <a href={`tel:${siteInfo.phone[0]}`} className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone size={12} /> {siteInfo.phone[0]}
              </a>
              <span className="hidden sm:flex items-center gap-1">
                <MapPin size={12} /> {siteInfo.address}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline">Your One Stop Security Shop</span>
              <a href={siteInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? `top-0 backdrop-blur-xl ${isDark ? 'bg-gemak-black/95 shadow-2xl shadow-black/50' : 'bg-white/95 shadow-lg shadow-black/5'}`
          : 'top-[32px] bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo — theme-aware */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <img
                src={isDark ? '/logo2.png' : '/dark-logo.png'}
                alt="Gemak Security Shop"
                className="h-12 md:h-14 w-auto object-contain"
                loading="eager"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-heading uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-gemak-green'
                      : isDark
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div layoutId="activeNav" className="absolute bottom-0 left-2 right-2 h-0.5 bg-gemak-green rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={iconBtnClass}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className={iconBtnClass}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/contact"
                className="hidden md:flex items-center gap-2 bg-gemak-green hover:bg-gemak-green-dark text-gemak-black font-heading uppercase text-sm tracking-wider px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gemak-green/20"
              >
                Get a Quote
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden ${iconBtnClass}`}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-30 backdrop-blur-2xl pt-24 px-6 lg:hidden overflow-y-auto ${
              isDark ? 'bg-gemak-black/98' : 'bg-white/98'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-4 text-3xl font-display tracking-wider border-b transition-colors ${
                      isDark ? 'border-white/5' : 'border-gray-100'
                    } ${isActive(link.path) ? 'text-gemak-green' : isDark ? 'text-white/80' : 'text-gray-800'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 space-y-4">
              {/* Theme toggle in mobile */}
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-center gap-3 border font-heading uppercase text-lg tracking-wider py-4 rounded-xl ${
                  isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-800'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>

              <Link to="/contact" className="block w-full text-center bg-gemak-green text-gemak-black font-heading uppercase text-lg tracking-wider py-4 rounded-xl">
                Get a Quote
              </Link>
              <div className={`text-center text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                <p>{siteInfo.phone[0]}</p>
                <p>{siteInfo.email}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl flex items-start justify-center pt-[15vh]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`w-full max-w-xl mx-4 rounded-2xl overflow-hidden shadow-2xl border ${
                isDark ? 'bg-gemak-black-light border-white/10' : 'bg-white border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center gap-3 p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <Search size={20} className="text-gemak-green" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, services, branches..."
                  className={`flex-1 bg-transparent text-lg outline-none ${
                    isDark ? 'text-white placeholder:text-white/30' : 'text-gray-900 placeholder:text-gray-400'
                  }`}
                />
                <kbd className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border ${
                  isDark ? 'text-white/30 bg-white/5 border-white/10' : 'text-gray-400 bg-gray-100 border-gray-200'
                }`}>
                  ESC
                </kbd>
              </div>

              {searchResults.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearchSelect(result)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors group ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gemak-green/10 flex items-center justify-center text-gemak-green text-xs font-bold uppercase">
                        {result.section[0]}
                      </div>
                      <div>
                        <p className={`font-medium group-hover:text-gemak-green transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.title}</p>
                        <p className={`text-xs capitalize ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{result.section}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className={`p-8 text-center ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                  <p>No results found for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}

              {searchQuery.length < 2 && (
                <div className={`p-6 text-center text-sm ${isDark ? 'text-white/20' : 'text-gray-300'}`}>
                  <p>Type at least 2 characters to search</p>
                  <p className="mt-1 text-xs">Try &ldquo;CCTV&rdquo;, &ldquo;boots&rdquo;, &ldquo;gate&rdquo;, &ldquo;alarm&rdquo;</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
