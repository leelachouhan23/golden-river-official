import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    // TODO: Integrate with a real payment gateway (Razorpay, Stripe, PayPal, etc.)
    toast.success('Checkout coming soon! Integrate your payment gateway here.');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-charcoal-800 shadow-2xl transition-transform duration-500 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-700">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} strokeWidth={1.5} className="text-gold-400" />
            <h2 className="font-display text-xl font-light text-cream-100 tracking-wide">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-gold-500 text-charcoal-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-cream-200/60 hover:text-gold-400 transition-colors p-1"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-cream-200/20" />
              <p className="font-display text-xl font-light text-cream-200/40">Your cart is empty</p>
              <p className="font-body text-sm text-cream-200/30">Discover our luxury fragrances</p>
              <button onClick={onClose} className="btn-outline text-xs mt-4">
                Browse Products
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 py-4 border-b border-charcoal-700">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-light text-cream-100 leading-tight">{item.name}</h3>
                    <p className="font-body text-xs text-cream-200/50 mt-0.5">{item.selectedSize || item.sizes?.[0]}</p>
                    <p className="font-body text-gold-400 text-sm font-medium mt-1">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-charcoal-600 flex items-center justify-center text-cream-200/60 hover:border-gold-500 hover:text-gold-400 transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-body text-sm text-cream-100 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-charcoal-600 flex items-center justify-center text-cream-200/60 hover:border-gold-500 hover:text-gold-400 transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-cream-200/30 hover:text-red-400 transition-colors self-start mt-1"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-charcoal-700 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-cream-200/60 tracking-wide">Subtotal</span>
              <span className="font-display text-xl font-light text-cream-100">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="font-body text-xs text-cream-200/30">Shipping & taxes calculated at checkout</p>
            <button onClick={handleCheckout} className="btn-gold w-full text-center">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center font-body text-xs text-cream-200/30 hover:text-red-400 transition-colors tracking-widest uppercase py-1"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
