import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]                 = useState('');
  const [sortBy, setSortBy]                 = useState('default');
  const [previewProduct, setPreviewProduct]  = useState(null);

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen pt-20">

      {/* ─── HEADER ─── */}
      <section className="py-20 bg-charcoal-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4">Our Fragrances</p>
          <h1 className="section-heading mb-4">The Collection</h1>
          <div className="gold-divider" />
          <p className="font-body text-base text-cream-200/50 mt-4">
            Each fragrance is a limited craft — select yours before it's gone.
          </p>
        </div>
      </section>

      {/* ─── FILTERS ─── */}
      <section className="py-8 bg-charcoal-900 border-b border-charcoal-700 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-body tracking-widest uppercase border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-gold-500 text-charcoal-900 border-gold-500'
                      : 'border-charcoal-600 text-cream-200/50 hover:border-gold-600/40 hover:text-gold-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/30" />
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-field pl-9 w-full md:w-52 py-2 text-xs"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/30" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field pl-9 pr-3 py-2 text-xs cursor-pointer appearance-none"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRID ─── */}
      <section className="py-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl font-light text-cream-200/20">No fragrances found</p>
              <p className="font-body text-sm text-cream-200/30 mt-3">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <p className="font-body text-xs text-cream-200/30 tracking-wide mb-8">
                Showing {filtered.length} of {products.length} fragrances
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onPreview={setPreviewProduct} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── QUICK PREVIEW MODAL ─── */}
      {previewProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="bg-charcoal-800 border border-charcoal-600 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto overflow-hidden">
                <img
                  src={previewProduct.image}
                  alt={previewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col">
                <button
                  onClick={() => setPreviewProduct(null)}
                  className="self-end text-cream-200/40 hover:text-gold-400 transition-colors mb-4 text-lg"
                >
                  ✕
                </button>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold-400 mb-1">
                  {previewProduct.category}
                </p>
                <h2 className="font-display text-3xl font-light text-cream-100">{previewProduct.name}</h2>
                <p className="font-body text-sm italic text-cream-200/50 mt-1 mb-4">{previewProduct.tagline}</p>
                <div className="gold-divider !mx-0 mb-4" />
                <p className="font-body text-sm text-cream-200/60 leading-relaxed mb-6">{previewProduct.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {Object.entries(previewProduct.notes).map(([k, v]) => (
                    <div key={k} className="bg-charcoal-700 p-2 text-center">
                      <p className="font-body text-[9px] uppercase tracking-wider text-gold-400">{k}</p>
                      <p className="font-body text-xs text-cream-200/60 mt-1">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-display text-3xl font-light text-cream-100">${previewProduct.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
