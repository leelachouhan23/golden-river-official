// ============================================================
// Golden River Perfume — Express Backend (FINAL ALL-IN-ONE)
// ============================================================
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const rateLimit  = require('express-rate-limit');
const nodemailer = require('nodemailer');

const contactRoutes = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 5000;

// ✅ trust proxy
app.set('trust proxy', 1);

// ─── Middleware ─────────────────────────
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 🔥 Ignore React hot-update error
app.use((req, res, next) => {
  if (req.url.includes('hot-update')) {
    return res.status(204).end();
  }
  next();
});

// ─── CORS ─────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// ─── Rate Limit ─────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// ─── MongoDB ─────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// ─── ORDER SCHEMA ─────────────────────────
const orderSchema = new mongoose.Schema({
  orderId: String,
  name: String,
  email: String,
  address: String,
  phone: String,
  productId: Number,
  productName: String,
  size: String,
  price: Number,
  image: String,
  category: String,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// ─── EMAIL SETUP ─────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔥 Verify Email
transporter.verify((err) => {
  if (err) {
    console.error("❌ Email config error:", err.message);
  } else {
    console.log("📧 Email server ready");
  }
});

// ─── ROUTES ─────────────────────────

// ROOT
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API running 🚀' });
});

// HEALTH
app.get('/api/health', (req, res) => {
  res.json({ success: true });
});

// CONTACT
app.use('/api/contact', contactRoutes);

// ─── ORDER ROUTE (FULL WORKING) ─────────────────────────
app.post('/api/order', async (req, res) => {
  try {
    console.log("📥 Order Request:", req.body);

    const {
      name,
      email,
      address,
      phone,
      productName,
      price,
      size,
      image
    } = req.body;

    // 🔥 VALIDATION
    if (!name || !email || !productName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // 🔥 CREATE ORDER
    const orderData = {
      ...req.body,
      orderId: "GR-" + Date.now(),
    };

    const order = await Order.create(orderData);
    console.log("📦 Order Saved:", order.orderId);

    // 🔥 SEND EMAIL
    try {
      console.log("📧 Sending email to:", order.email);

      await transporter.sendMail({
        from: `"Golden River" <${process.env.EMAIL_USER}>`,
        to: order.email,
        subject: "Order Confirmation — Golden River",
        html: `
        <div style="max-width:600px;margin:auto;font-family:Arial;padding:20px;">
          
          <h2 style="text-align:center;">GOLDEN RIVER</h2>

          <p>Hello ${order.name},</p>
          <p>Your order has been placed successfully 🎉</p>

          <div style="border:1px solid #ddd;padding:15px;margin-top:20px;">
            
            <img src="${order.image}" 
                 style="width:100%;max-width:250px;display:block;margin:auto;" />

            <h3 style="text-align:center;">${order.productName}</h3>

            <p style="text-align:center;">Size: ${order.size}</p>
            <p style="text-align:center;">Price: ₹${order.price}</p>

            <p style="text-align:center;font-size:12px;color:#777;">
              Order ID: ${order.orderId}
            </p>
          </div>

          <div style="margin-top:20px;">
            <h4>Shipping Details</h4>
            <p>${order.address}</p>
            <p>${order.phone}</p>
          </div>

          <p style="margin-top:20px;font-size:12px;color:#888;">
            Thank you for shopping with Golden River ✨
          </p>

        </div>
        `
      });

      console.log("✅ Email sent");

    } catch (emailErr) {
      console.warn("⚠️ Email failed BUT order saved:", emailErr.message);
    }

    // 🔥 RESPONSE
    res.json({
      success: true,
      message: "Order placed successfully 🎉",
      order
    });

  } catch (err) {
    console.error("❌ ORDER ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// ─── 404 ─────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── ERROR HANDLER ─────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ success: false });
});

// ─── START SERVER ─────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
});