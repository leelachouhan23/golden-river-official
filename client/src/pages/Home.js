import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Award, Leaf, Globe } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

/* ─── Animated number counter ─── */
const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const end   = parseInt(target);
    const step  = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { start = end; clearInterval(timer); }
      if (ref.current) ref.current.textContent = start + suffix;
    }, 25);
    return () => clearInterval(timer);
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden grain-overlay"
        style={{
          // TODO: Replace with your actual hero background image
          background: 'linear-gradient(135deg, #0f0e0b 0%, #1a1610 40%, #0f0e0b 100%)',
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gold-400/5 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
          <div
            className="absolute inset-y-0 right-0 w-1/2 md:w-2/5"
            style={{
              // TODO: Replace with your actual hero product image
              backgroundImage: `url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.95) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.95) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="max-w-2xl">
            {/* Pre-heading */}
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-6 animate-fade-up">
              ✦ Luxury Fragrance House ✦
            </p>

            {/* Main Heading */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream-100 leading-tight mb-4 animate-fade-up animate-delay-100">
              Wear the <br />
              <span className="text-shimmer italic">Scent of Gold</span>
            </h1>

            <div className="gold-divider !mx-0 animate-fade-up animate-delay-200" />

            <p className="font-body text-base md:text-lg text-cream-200/60 leading-relaxed mt-4 mb-10 max-w-lg animate-fade-up animate-delay-300">
              Handcrafted from the world's rarest botanicals. Each Golden River fragrance
              is a journey through time — ancient wisdom distilled into modern luxury.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-400">
              <Link to="/products" className="btn-gold">
                Explore Collection
              </Link>
              <Link to="/about" className="btn-outline flex items-center gap-2">
                Our Story <ArrowRight size={14} />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex gap-8 mt-16 animate-fade-up animate-delay-500">
              {[
                { icon: Star,   text: '4.9 Rating'    },
                { icon: Award,  text: 'Award Winning'  },
                { icon: Leaf,   text: '100% Natural'   },
                { icon: Globe,  text: 'Ships Worldwide' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5">
                  <Icon size={16} className="text-gold-400" strokeWidth={1.5} />
                  <p className="font-body text-[10px] text-cream-200/40 tracking-widest uppercase whitespace-nowrap">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animate-delay-700">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-cream-200/30">Scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-gold-500/40 to-transparent" />
        </div>
      </section>

      {/* ─── BRAND INTRO ─── */}
      <section className="py-28 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Our Philosophy</p>
              <h2 className="section-heading mb-6">
                Where Nature<br />
                <span className="italic font-light text-gold-300">Meets Craft</span>
              </h2>
              <div className="gold-divider !mx-0 mb-6" />
              <p className="font-body text-base text-cream-200/60 leading-relaxed mb-5">
                At Golden River, we believe a fragrance is more than a scent — it's an identity, 
                a memory, an emotion captured in a bottle. We source the finest ingredients from 
                over 30 countries, blended by master perfumers with generations of expertise.
              </p>
              <p className="font-body text-base text-cream-200/60 leading-relaxed mb-10">
                From the oud forests of Cambodia to the rose valleys of Bulgaria, every drop 
                tells a story of origin, passion, and uncompromising quality.
              </p>
              <Link to="/about" className="btn-outline inline-flex items-center gap-2">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '2018', suffix: '', label: 'Founded' },
                { value: '30',   suffix: '+', label: 'Countries Sourced' },
                { value: '5000', suffix: '+', label: 'Happy Customers' },
                { value: '24',   suffix: '',  label: 'Signature Blends' },
              ].map(({ value, suffix, label }) => (
                <div key={label} className="bg-charcoal-700 border border-charcoal-600 p-6 text-center hover:border-gold-600/30 transition-colors duration-300">
                  <p className="font-display text-4xl font-light text-gold-400">
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p className="font-body text-xs tracking-widest uppercase text-cream-200/40 mt-2">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-28 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Curated Collection</p>
            <h2 className="section-heading">Signature Fragrances</h2>
            <div className="gold-divider" />
            <p className="font-body text-base text-cream-200/50 max-w-xl mx-auto mt-4">
              Each bottle is a masterpiece — limited in quantity, infinite in experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline inline-flex items-center gap-2">
              View All Fragrances <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-28 bg-charcoal-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Voices of Our Community</p>
            <h2 className="section-heading">What They Say</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aria Sharma',
                role: 'Fragrance Enthusiast',
                quote: '"Oud Amber Royale is unlike anything I\'ve ever worn. It\'s bold, mysterious, and stays with me for hours. Truly world-class."',
                rating: 5,
              },
              {
                name: 'Marcus Webb',
                role: 'Fashion Editor',
                quote: '"Golden Riviera became my signature scent within a week. The blend of bergamot and jasmine is absolutely sublime."',
                rating: 5,
              },
              {
                name: 'Priya Nair',
                role: 'Lifestyle Blogger',
                quote: '"The packaging alone tells you this is luxury. But the fragrance? It\'s poetry. Silk & Saffron is worth every rupee."',
                rating: 5,
              },
            ].map(({ name, role, quote, rating }) => (
              <div key={name} className="bg-charcoal-700 border border-charcoal-600 p-8 hover:border-gold-600/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="font-display text-base font-light italic text-cream-200/70 leading-relaxed mb-6">{quote}</p>
                <div>
                  <p className="font-body text-sm font-medium text-cream-100">{name}</p>
                  <p className="font-body text-xs text-cream-200/40 tracking-wide">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1610 0%, #2a2010 50%, #1a1610 100%)',
          borderTop: '1px solid rgba(212,160,23,0.15)',
          borderBottom: '1px solid rgba(212,160,23,0.15)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4">Limited Time Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream-100 mb-4">
            Free Shipping on<br />
            <span className="italic text-gold-300">Orders Over $150</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-base text-cream-200/50 mb-10 mt-4">
            Experience luxury delivered to your door. No minimum on select fragrances.
          </p>
          <Link to="/products" className="btn-gold inline-flex items-center gap-3">
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
