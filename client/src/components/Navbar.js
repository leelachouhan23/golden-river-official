import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartOpen }) => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { totalItems }            = useCart();
  const location                  = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { label: 'Home',     to: '/' },
    { label: 'About',    to: '/about' },
    { label: 'Products', to: '/products' },
    { label: 'Contact',  to: '/contact' },
  ];

  const isActive = (path) =>
    location.pathname === path ? 'text-gold-400' : 'text-cream-200/80 hover:text-gold-300';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* TODO: Replace text logo with your actual logo image */}
            <Link to="/" className="flex flex-col items-start group">
              <span className="font-display text-xl font-light tracking-[0.25em] text-gold-400 uppercase leading-none">
                Golden River
              </span>
              <span className="font-body text-[9px] tracking-[0.45em] text-cream-200/60 uppercase mt-0.5">
                Perfume
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${isActive(to)}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Cart + Mobile Toggle */}
            <div className="flex items-center gap-6">
              <button
                onClick={onCartOpen}
                className="relative p-2 text-cream-200/80 hover:text-gold-400 transition-colors duration-300"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-charcoal-900 text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[18px] min-h-[18px] px-1">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="md:hidden text-cream-200/80 hover:text-gold-400 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal-900/98 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`font-display text-3xl font-light tracking-widest transition-colors duration-300 ${
                  location.pathname === to ? 'text-gold-400' : 'text-cream-100 hover:text-gold-400'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="gold-divider mt-12" />
        {/* TODO: Replace with your actual social links */}
        <p className="font-body text-xs tracking-widest text-cream-200/40 uppercase mt-4">
          @goldenriverperfume
        </p>
      </div>
    </>
  );
};

export default Navbar;
