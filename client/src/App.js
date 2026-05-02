import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import CartDrawer  from './components/CartDrawer';
import Chatbot     from './components/Chatbot';

import Home     from './pages/Home';
import About    from './pages/About';
import Products from './pages/Products';
import Contact  from './pages/Contact';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-charcoal-900 text-cream-100 flex flex-col">
          <Toaster position="top-right" />
          <Navbar onCartOpen={() => setCartOpen(true)} />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <Chatbot />

          <main className="flex-1">
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/about"    element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact"  element={<Contact />} />
              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                    <p className="font-display text-8xl font-light text-gold-400 mb-4">404</p>
                    <p className="font-display text-2xl font-light text-cream-200/60">Page Not Found</p>
                    <a href="/" className="btn-outline mt-8 inline-block">Return Home</a>
                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
