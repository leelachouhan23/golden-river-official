import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// TODO: Update this URL if you deploy your backend to Render or another host
// ✅ Correct for Vite
  const API_URL = import.meta.env.VITE_API_URL || 'https://golden-river-backend.onrender.com';const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.', {
        style: { background: '#1a1813', color: '#f8f4e8', border: '1px solid #d4a017' },
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        toast.success('Message sent successfully!', {
          style: { background: '#1a1813', color: '#f8f4e8', border: '1px solid #d4a017' },
          iconTheme: { primary: '#d4a017', secondary: '#0f0e0b' },
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error('Unable to reach server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Visit Us',
      // TODO: Replace with your actual business address
      value: '123 Perfumer\'s Lane, New Delhi, 110001, India',
      href: null,
    },
    {
      icon: Phone,
      label: 'Call Us',
      // TODO: Replace with your actual phone number
      value: '+91 12345 67890',
      href: 'tel:+911234567890',
    },
    {
      icon: Mail,
      label: 'Email Us',
      // TODO: Replace with your actual contact email
      value: 'goldenriver@perfume.com',
      href: 'mailto:leela23@navgurukul.org',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      // TODO: Update with your actual business hours
      value: 'Mon–Sat: 10am – 7pm IST',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen pt-20">

      {/* ─── HEADER ─── */}
      <section className="py-20 bg-charcoal-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gold-500/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4">Get In Touch</p>
          <h1 className="section-heading mb-4">Contact Us</h1>
          <div className="gold-divider" />
          <p className="font-body text-base text-cream-200/50 mt-4">
            We'd love to hear from you. Whether it's a question about our fragrances or a custom order — we're here.
          </p>
        </div>
      </section>

      {/* ─── MAIN ─── */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-light text-cream-100 mb-8">Our Information</h2>

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex gap-4 p-5 bg-charcoal-800 border border-charcoal-700 hover:border-gold-600/30 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-widest text-gold-400/70 mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-sm text-cream-200/60 hover:text-gold-300 transition-colors leading-relaxed">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-cream-200/60 leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-charcoal-800 border border-charcoal-700 p-4 mt-6">
                <p className="font-body text-xs text-cream-200/30 text-center py-8">
                  {/* TODO: Embed Google Maps iframe here */}
                  📍 Map Embed — Add Google Maps iframe
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20 bg-charcoal-800 border border-charcoal-700 px-8">
                  <CheckCircle size={48} className="text-gold-400 mb-6" strokeWidth={1} />
                  <h2 className="font-display text-3xl font-light text-cream-100 mb-3">Message Received</h2>
                  <div className="gold-divider" />
                  <p className="font-body text-base text-cream-200/50 mt-4 max-w-md">
                    Thank you for reaching out. Our team will get back to you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-8"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-charcoal-800 border border-charcoal-700 p-8 lg:p-12">
                  <h2 className="font-display text-2xl font-light text-cream-100 mb-2">Send a Message</h2>
                  <p className="font-body text-sm text-cream-200/40 mb-8">Fields marked with * are required</p>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block font-body text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block font-body text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="input-field"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block font-body text-xs uppercase tracking-widest text-cream-200/50 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="input-field resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold flex items-center gap-3 w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-charcoal-900 border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
