import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const [size, setSize] = useState(product.sizes[0]);
  const [imgErr, setImgErr] = useState(false);

  const [showOrder, setShowOrder] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleAdd = () => {
    addItem({ ...product, selectedSize: size });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    setShowOrder(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ PLACE ORDER (UPGRADED)
  const handleOrder = async () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error("Please fill all fields ⚠️");
      return;
    }

    if (!form.email.includes("@")) {
      toast.error("Invalid email ❌");
      return;
    }

    try {
      setLoading(true);

      // 🧠 UNIQUE ORDER ID
      const orderId = "GR-" + Date.now();

      const payload = {
        orderId,
        ...form,
        productId: product.id,
        productName: product.name,
        size,
        price: product.price,
        image: product.image,
        category: product.category || "Perfume",
        createdAt: new Date().toISOString(),
      };

      console.log("📤 Sending:", payload);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/order`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server not responding");

      const data = await res.json();
      console.log("📥 Response:", data);

      if (data.success) {
        toast.success("Order placed successfully 🎉");
        setShowOrder(false);

        // reset form
        setForm({
          name: '',
          email: '',
          address: '',
          phone: '',
        });

      } else {
        toast.error("Order failed ❌");
      }

    } catch (err) {
      console.error("❌ ERROR:", err);
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="group relative bg-charcoal-800 border border-charcoal-700 hover:border-gold-600/40 transition-all duration-500 hover:-translate-y-1 flex flex-col">

        {/* IMAGE */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <img
            src={
              imgErr
                ? 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80'
                : product.image
            }
            alt={product.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg text-white">{product.name}</h3>

          {/* SIZE */}
          <div className="flex gap-2 my-3">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-2 py-1 border ${
                  size === s
                    ? 'border-yellow-500 text-yellow-400'
                    : 'border-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* PRICE + BUTTONS */}
          <div className="flex justify-between items-center mt-auto">
            <span className="text-white text-xl">${product.price}</span>

            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="bg-yellow-500 px-3 py-1 text-black"
              >
                <ShoppingBag size={14} />
              </button>

              <button
                onClick={handleBuyNow}
                className="border border-yellow-500 px-3 py-1 text-yellow-400"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER MODAL */}
      {showOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[300px] text-black">
            <h2 className="text-lg mb-3">Place Order</h2>

            <input
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              className="w-full mb-2 p-2 border"
            />

            <input
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-2 p-2 border"
            />

            <input
              name="phone"
              value={form.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full mb-2 p-2 border"
            />

            <textarea
              name="address"
              value={form.address}
              placeholder="Address"
              onChange={handleChange}
              className="w-full mb-2 p-2 border"
            />

            <button
              onClick={handleOrder}
              disabled={loading}
              className="bg-green-500 w-full py-2 mt-2 text-white"
            >
              {loading ? "Placing..." : "Place Order"}
            </button>

            <button
              onClick={() => setShowOrder(false)}
              className="mt-2 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;