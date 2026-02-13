import React from 'react';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Star, ShoppingCart, Eye, X, Grid3X3, LayoutList, Heart, Phone } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PageSEO from '../components/PageSEO';
import { products, productCategories, siteInfo } from '../data/siteData';

/* ── Skeleton placeholder for images ── */
const isPlaceholder = (src) => src && src.includes('LOGO');

function ProductImage({ src, alt, className = '', ...props }) {
  const [loaded, setLoaded] = useState(false);
  const placeholder = isPlaceholder(src);
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`${placeholder ? 'w-full h-full object-contain p-6' : className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';

  const [category, setCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ── Wishlist — persisted in localStorage ── */
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gemak-favorites') || '[]'); }
    catch { return []; }
  });

  const toggleFavorite = (e, productId) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('gemak-favorites', JSON.stringify(next));
      return next;
    });
  };

  /* ── Product image zoom state ── */
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category !== 'All') filtered = filtered.filter(p => p.category === category);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high': return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating': return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'name': return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default: return filtered;
    }
  }, [category, searchQuery, sortBy, priceRange]);

  return (
    <>
      <PageSEO title="Shop" description="Browse and purchase security equipment — CCTV cameras, alarm systems, self-defense products, communication devices, and more from Gemak Security Shop." keywords="buy CCTV cameras, security equipment, alarm systems, taser, boots, walkie talkie, Zimbabwe" />

      {/* Hero — Compact */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gemak-black-light">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-green opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-gemak-green text-xs font-heading uppercase tracking-[0.3em]">Security Equipment</span>
            <h1 className="font-display text-4xl md:text-6xl mt-2">OUR <span className="text-gradient-green">SHOP</span></h1>
            <p className="text-white/40 mt-3 max-w-lg">Premium security products at unbeatable prices. Visit any of our 9 branches or order online.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Shop Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-gemak-green/30 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm">
                <SlidersHorizontal size={16} /> Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 text-sm outline-none focus:border-gemak-green/30 cursor-pointer appearance-none"
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>

              <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setViewMode('grid')} className={`p-3 ${viewMode === 'grid' ? 'text-gemak-green bg-gemak-green/10' : 'text-white/30'} transition-all`}>
                  <Grid3X3 size={16} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-3 ${viewMode === 'list' ? 'text-gemak-green bg-gemak-green/10' : 'text-white/30'} transition-all`}>
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'block fixed inset-0 z-50 bg-gemak-black/95 p-6 pt-20' : 'hidden'} md:block md:static md:bg-transparent md:p-0 md:w-60 shrink-0`}>
              {showFilters && (
                <button onClick={() => setShowFilters(false)} className="md:hidden absolute top-6 right-6 text-white">
                  <X size={24} />
                </button>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading uppercase tracking-wider text-white text-sm mb-3">Categories</h3>
                  <div className="space-y-1">
                    {productCategories.map((cat) => {
                      const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => { setCategory(cat); setShowFilters(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                            category === cat ? 'bg-gemak-green/10 text-gemak-green' : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                          }`}
                        >
                          {cat}
                          <span className="text-xs opacity-50">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading uppercase tracking-wider text-white text-sm mb-3">Price Range</h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                      placeholder="Min"
                    />
                    <span className="text-white/20">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="glass-card-green rounded-xl p-4">
                  <p className="text-white text-sm font-medium">Need help choosing?</p>
                  <p className="text-white/40 text-xs mt-1">Our experts can recommend the perfect setup.</p>
                  <a href={`tel:${siteInfo.phone[0]}`} className="mt-3 flex items-center gap-2 text-gemak-green text-sm font-heading uppercase tracking-wider">
                    <Phone size={14} /> Call Us
                  </a>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="text-white/30 text-sm mb-4">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/30 text-lg">No products match your criteria.</p>
                  <button onClick={() => { setCategory('All'); setSearchQuery(''); setPriceRange([0, 500]); }} className="mt-4 text-gemak-green text-sm hover:underline">
                    Clear all filters
                  </button>
                </div>
              ) : (
                <motion.div layout className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  <AnimatePresence>
                    {filteredProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                      >
                        {viewMode === 'grid' ? (
                          <div className="group glass-card rounded-2xl overflow-hidden hover:border-gemak-green/20 transition-all duration-300 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                            <div className="relative aspect-square overflow-hidden bg-white/5">
                              <ProductImage src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                              {product.badge && (
                                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-heading uppercase tracking-wider ${
                                  product.badge === 'Premium' ? 'bg-gemak-green text-gemak-black' :
                                  product.badge === 'Sale' || product.badge === 'Hot' ? 'bg-gemak-red text-white' :
                                  'bg-white/10 backdrop-blur text-white'
                                }`}>{product.badge}</div>
                              )}
                              {product.oldPrice && (
                                <div className="absolute top-3 right-12 bg-gemak-red/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                                </div>
                              )}
                              {/* Wishlist heart */}
                              <button
                                onClick={(e) => toggleFavorite(e, product.id)}
                                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-10 ${
                                  favorites.includes(product.id)
                                    ? 'bg-gemak-red text-white scale-100'
                                    : 'bg-black/30 text-white/50 hover:text-white opacity-0 group-hover:opacity-100'
                                }`}
                              >
                                <Heart size={14} className={favorites.includes(product.id) ? 'fill-current' : ''} />
                              </button>
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Eye size={24} className="text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <p className="text-white/40 text-[10px] font-heading uppercase tracking-wider">{product.category}</p>
                              <h3 className="text-white text-sm font-medium mt-1 line-clamp-2 group-hover:text-gemak-green transition-colors">{product.name}</h3>
                              <div className="flex items-baseline gap-2 mt-2">
                                <span className="font-display text-xl text-gemak-green">${product.price}</span>
                                {product.oldPrice && <span className="text-white/20 text-xs line-through">${product.oldPrice}</span>}
                              </div>
                              <div className="flex items-center gap-1 mt-1.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-gemak-green fill-gemak-green' : 'text-white/10'} />
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="group glass-card rounded-xl p-4 flex gap-4 hover:border-gemak-green/20 transition-all cursor-pointer" onClick={() => setSelectedProduct(product)}>
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5 shrink-0">
                              <ProductImage src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white/30 text-[10px] font-heading uppercase tracking-wider">{product.category}</p>
                              <h3 className="text-white font-medium mt-0.5 group-hover:text-gemak-green transition-colors">{product.name}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-gemak-green fill-gemak-green' : 'text-white/10'} />
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className="font-display text-2xl text-gemak-green">${product.price}</span>
                              {product.oldPrice && <p className="text-white/20 text-xs line-through">${product.oldPrice}</p>}
                              <button
                                onClick={(e) => toggleFavorite(e, product.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                  favorites.includes(product.id)
                                    ? 'bg-gemak-red/10 text-gemak-red'
                                    : 'text-white/20 hover:text-white/50'
                                }`}
                              >
                                <Heart size={14} className={favorites.includes(product.id) ? 'fill-current' : ''} />
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Quick View Modal — with image zoom */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => { setSelectedProduct(null); setIsZoomed(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-2xl bg-gemak-black-light border border-white/10 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Zoomable Image */}
                <div
                  className="aspect-square bg-white/5 overflow-hidden cursor-zoom-in"
                  onMouseMove={handleZoomMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className={`w-full h-full transition-transform duration-200 ease-out ${isPlaceholder(selectedProduct.image) ? 'object-contain p-8' : 'object-cover'}`}
                    style={{
                      transform: isZoomed && !isPlaceholder(selectedProduct.image) ? 'scale(2)' : 'scale(1)',
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(e, selectedProduct.id); }}
                      className={`p-2 rounded-lg transition-all ${
                        favorites.includes(selectedProduct.id)
                          ? 'bg-gemak-red/10 text-gemak-red'
                          : 'text-white/30 hover:text-white/60'
                      }`}
                    >
                      <Heart size={18} className={favorites.includes(selectedProduct.id) ? 'fill-current' : ''} />
                    </button>
                    <button onClick={() => { setSelectedProduct(null); setIsZoomed(false); }} className="p-1 text-white/30 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-gemak-green text-xs font-heading uppercase tracking-wider">{selectedProduct.category}</p>
                  <h2 className="font-heading text-2xl uppercase tracking-wider text-white mt-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(selectedProduct.rating) ? 'text-gemak-green fill-gemak-green' : 'text-white/10'} />
                    ))}
                    <span className="text-white/30 text-sm ml-1">{selectedProduct.rating}</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="font-display text-4xl text-gemak-green">${selectedProduct.price}</span>
                    {selectedProduct.oldPrice && <span className="text-white/20 text-lg line-through">${selectedProduct.oldPrice}</span>}
                  </div>
                  {selectedProduct.badge && (
                    <span className={`inline-block mt-3 px-3 py-1 rounded-lg text-xs font-heading uppercase tracking-wider w-fit ${
                      selectedProduct.badge === 'Premium' ? 'bg-gemak-green/10 text-gemak-green' : 'bg-gemak-red/10 text-gemak-red'
                    }`}>{selectedProduct.badge}</span>
                  )}
                  <p className="text-white/30 text-sm mt-4 leading-relaxed">
                    Available at all 9 Gemak Security Shop branches nationwide. Contact us for bulk pricing and installation services.
                  </p>
                  <p className="text-white/15 text-xs mt-2 hidden md:block">Hover over image to zoom</p>
                  <div className="mt-auto pt-6 flex gap-3">
                    <a href={`https://wa.me/263773910305?text=${encodeURIComponent(`Hi Gemak Security Shop,\n\nI'm interested in ordering:\n\n*${selectedProduct.name}*\nPrice: $${selectedProduct.price}\nCategory: ${selectedProduct.category}\n\nPlease confirm availability and provide further details. Thank you!`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-gemak-green text-gemak-black font-heading uppercase text-sm tracking-wider py-3 rounded-xl hover:bg-gemak-green-dark transition-all">
                      <ShoppingCart size={16} /> Order via WhatsApp
                    </a>
                    <a href={`tel:${siteInfo.phone[0]}`} className="flex items-center justify-center px-4 border border-white/10 rounded-xl text-white/60 hover:bg-white/5 transition-all">
                      <Phone size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
