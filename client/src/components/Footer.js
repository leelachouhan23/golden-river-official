import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-800 border-t border-charcoal-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* TODO: Replace with your actual logo */}
            <div className="mb-4">
              <span className="font-display text-2xl font-light tracking-[0.25em] text-gold-400 uppercase block">
                Golden River
              </span>
              <span className="font-body text-[9px] tracking-[0.45em] text-cream-200/40 uppercase">
                Perfume
              </span>
            </div>
            <p className="font-body text-sm text-cream-200/50 leading-relaxed mt-4">
              Crafting luxury fragrances from the world's rarest botanicals since 2018.
              Every scent is a story waiting to be worn.
            </p>
            <div className="flex gap-4 mt-6">
              {/* TODO: Replace # with your actual social media URLs */}
              <a href="#" aria-label="Instagram" className="text-cream-200/40 hover:text-gold-400 transition-colors duration-300">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="text-cream-200/40 hover:text-gold-400 transition-colors duration-300">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Twitter" className="text-cream-200/40 hover:text-gold-400 transition-colors duration-300">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-gold-400 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home',      to: '/' },
                { label: 'About Us',  to: '/about' },
                { label: 'Products',  to: '/products' },
                { label: 'Contact',   to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-cream-200/50 hover:text-gold-300 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-gold-400 mb-6">Collections</h4>
            <ul className="space-y-3">
              {['Oriental', 'Floral', 'Fresh', 'Woody', 'Limited Edition'].map(c => (
                <li key={c}>
                  <Link
                    to="/products"
                    className="font-body text-sm text-cream-200/50 hover:text-gold-300 transition-colors duration-300"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-gold-400 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                {/* TODO: Replace with your actual business address */}
                <span className="font-body text-sm text-cream-200/50 leading-relaxed">
                  123 Perfumer's Lane<br />
                  New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold-500 flex-shrink-0" strokeWidth={1.5} />
                {/* TODO: Replace with your actual phone number */}
                <a href="tel:+911234567890" className="font-body text-sm text-cream-200/50 hover:text-gold-300 transition-colors">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold-500 flex-shrink-0" strokeWidth={1.5} />
                {/* TODO: Replace with your actual contact email */}
                <a href="mailto:hello@goldenriverperfume.com" className="font-body text-sm text-cream-200/50 hover:text-gold-300 transition-colors">
                  hello@goldenriverperfume.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream-200/30 tracking-wide">
            © {year} Golden River Perfume. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(item => (
              <a
                key={item}
                href="#"
                className="font-body text-xs text-cream-200/30 hover:text-gold-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
