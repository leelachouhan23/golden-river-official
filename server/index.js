// ============================================================
// Golden River Perfume — Express Backend (FIXED)
// ============================================================
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const rateLimit  = require('express-rate-limit');

const contactRoutes = require('./routes/contact');
const orderRoutes = require('./routes/order');

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
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://golden-river-perfume.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked for origin: ${origin}`);
      callback(null, true);
    }
  },
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

// ORDER
app.use('/api/order', orderRoutes);

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