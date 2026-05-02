import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Globe, Award, Heart, ArrowRight } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Natural Purity',
      desc: 'We source only the finest natural botanicals — no synthetic shortcuts, no compromises. Every ingredient is ethically harvested and sustainably sourced.',
    },
    {
      icon: Award,
      title: 'Master Craftsmanship',
      desc: 'Our perfumers carry decades of tradition. Each formula undergoes over 200 iterations before it earns the Golden River signature.',
    },
    {
      icon: Globe,
      title: 'Global Sourcing',
      desc: 'From Cambodian oud forests to Bulgarian rose valleys, we travel the world to bring the rarest and most exquisite ingredients to your senses.',
    },
    {
      icon: Heart,
      title: 'Emotional Resonance',
      desc: 'We craft fragrances that don\'t just smell beautiful — they evoke memories, stir emotions, and become part of your personal story.',
    },
  ];

  const timeline = [
    { year: '2018', title: 'The Beginning', desc: 'Founded in a small atelier in Mumbai with a single vision: bring world-class luxury perfumery to those who demand the finest.' },
    { year: '2019', title: 'First Collection', desc: 'Launch of our debut Oriental collection, featuring Oud Amber Royale. Sold out within 3 days.' },
    { year: '2021', title: 'Global Expansion', desc: 'Partnership with sourcing agents across 30 countries. Opened flagship experience stores in Delhi and Mumbai.' },
    { year: '2023', title: 'Award Recognition', desc: 'Received the Asia Pacific Fragrance Excellence Award. Featured in Vogue India and Harper\'s Bazaar.' },
    { year: '2025', title: 'Today', desc: 'Serving over 5,000 customers worldwide, with 24 signature blends and a commitment to push the boundaries of perfumery.' },
  ];

  return (
    <div className="min-h-screen pt-20">

      {/* ─── HERO ─── */}
      <section className="relative py-28 bg-charcoal-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
            style={{
              // TODO: Replace with your own about-page hero image
              backgroundImage: `url('https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=70')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-800 via-charcoal-800/90 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4 animate-fade-up">Our Story</p>
          <h1 className="section-heading max-w-2xl mb-6 animate-fade-up animate-delay-100">
            Born from a Passion<br />
            <span className="italic text-gold-300">for the Extraordinary</span>
          </h1>
          <div className="gold-divider !mx-0 mb-6 animate-fade-up animate-delay-200" />
          <p className="font-body text-lg text-cream-200/60 max-w-xl leading-relaxed animate-fade-up animate-delay-300">
            Golden River Perfume was born from a single belief: that the rarest fragrances 
            in the world deserve to be worn by those who truly appreciate them.
          </p>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-24 bg-charcoal-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  // TODO: Replace with your own about-page brand image
                  src="https://images.pexels.com/photos/30238399/pexels-photo-30238399.jpeg"
                  alt="Perfumer at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-500 p-8 hidden lg:block">
                <p className="font-display text-2xl font-light text-charcoal-900">7+</p>
                <p className="font-body text-xs tracking-widest uppercase text-charcoal-600 mt-1">Years of Excellence</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Our Mission</p>
              <h2 className="section-heading text-3xl md:text-4xl mb-6">
                To Make Luxury<br />
                <span className="italic text-gold-300">Timeless</span>
              </h2>
              <div className="gold-divider !mx-0 mb-6" />
              <p className="font-body text-base text-cream-200/60 leading-relaxed mb-5">
                We started Golden River with one goal: to create fragrances that compete on 
                the world stage — fragrances that belong in the same conversation as the 
                great houses of Paris and Dubai, but created right here, with an Indian soul.
              </p>
              <p className="font-body text-base text-cream-200/60 leading-relaxed mb-10">
                Every perfume we craft is a dialogue between tradition and modernity. We 
                respect the ancient art of perfumery while pushing its boundaries with 
                contemporary creativity and scientific precision.
              </p>
              <Link to="/products" className="btn-gold inline-flex items-center gap-2">
                Discover Our Collection <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">What We Stand For</p>
            <h2 className="section-heading">Our Core Values</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-charcoal-700 border border-charcoal-600 p-8 text-center hover:border-gold-600/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold-500/10 transition-colors duration-300">
                  <Icon size={20} className="text-gold-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-light text-cream-100 mb-3">{title}</h3>
                <p className="font-body text-xs text-cream-200/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-24 bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Our Journey</p>
            <h2 className="section-heading">The Golden River Story</h2>
            <div className="gold-divider" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-charcoal-600 -translate-x-0 md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map(({ year, title, desc }, i) => (
                <div
                  key={year}
                  className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 rounded-full bg-gold-500 border-2 border-charcoal-900 -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-charcoal-800 border border-charcoal-700 p-6 hover:border-gold-600/30 transition-colors duration-300">
                      <span className="font-body text-xs tracking-widest uppercase text-gold-400">{year}</span>
                      <h3 className="font-display text-xl font-light text-cream-100 mt-1 mb-2">{title}</h3>
                      <p className="font-body text-sm text-cream-200/50 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM SECTION ─── */}
      <section className="py-24 bg-charcoal-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">The Artisans</p>
            <h2 className="section-heading">Meet Our Team</h2>
            <div className="gold-divider" />
            <p className="font-body text-base text-cream-200/50 max-w-lg mx-auto mt-4">
              A team of master perfumers, botanical experts, and creative visionaries united by passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun Mehta',
                role: 'Founder & Chief Perfumer',
                // TODO: Replace with real team member photos
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
                bio: '20+ years mastering Oriental and woody accords.',
              },
              {
                name: 'Leila Hassan',
                role: 'Head of Sourcing',
                // TODO: Replace with real team member photos
                image: 'https://images.pexels.com/photos/13331367/pexels-photo-13331367.jpeg',
                bio: 'Travels across 30 countries to find the rarest ingredients.',
              },
              {
                name: 'Rohan Kapoor',
                role: 'Creative Director',
                // TODO: Replace with real team member photos
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
                bio: 'Translates ancient traditions into modern luxury experiences.',
              },
            ].map(({ name, role, image, bio }) => (
              <div key={name} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-5 overflow-hidden rounded-full border-2 border-charcoal-600 group-hover:border-gold-500/40 transition-colors duration-300">
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display text-xl font-light text-cream-100">{name}</h3>
                <p className="font-body text-xs tracking-widest uppercase text-gold-400 mt-1">{role}</p>
                <p className="font-body text-sm text-cream-200/40 mt-2">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
