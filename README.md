# 🌟 Golden River Perfume — Full Stack Website

A production-ready luxury perfume brand website built with **React + Tailwind CSS** (frontend) and **Node.js + Express** (backend).

---

## 📁 Project Structure

```
golden-river-perfume/
├── client/                        # React frontend
│   ├── public/
│   │   └── index.html             # HTML template + SEO meta tags
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js          # Fixed navigation bar
│   │   │   ├── Footer.js          # Site footer
│   │   │   ├── CartDrawer.js      # Slide-out cart
│   │   │   ├── ProductCard.js     # Product listing card
│   │   │   └── Chatbot.js         # AI chatbot UI
│   │   ├── context/
│   │   │   └── CartContext.js     # Global cart state (React Context)
│   │   ├── data/
│   │   │   └── products.js        # ⚠️ Product data — UPDATE THIS
│   │   ├── pages/
│   │   │   ├── Home.js            # Hero, brand intro, featured products
│   │   │   ├── About.js           # Brand story, mission, team
│   │   │   ├── Products.js        # Full product catalogue + filters
│   │   │   └── Contact.js         # Contact form → backend API
│   │   ├── App.js                 # Router + layout
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Tailwind + custom styles
│   ├── .env                       # ⚠️ Frontend env vars (see below)
│   └── vercel.json                # Vercel deployment config
│
├── server/                        # Node.js backend
│   ├── models/
│   │   └── Contact.js             # MongoDB schema for contact submissions
│   ├── routes/
│   │   └── contact.js             # POST /api/contact route
│   ├── services/
│   │   └── emailService.js        # Nodemailer email functions
│   ├── index.js                   # Express app entry point
│   ├── .env                       # ⚠️ Server env vars (see below)
│   └── package.json
│
├── render.yaml                    # Render deployment config
├── .gitignore
└── README.md
```

---

## ⚡ Local Setup (Step-by-Step)

### Prerequisites
- Node.js v18+ ([download](https://nodejs.org))
- npm v9+
- MongoDB (local or free [Atlas cluster](https://cloud.mongodb.com))
- Git

---

### Step 1 — Clone / Download the Project

```bash
git clone https://github.com/YOUR_USERNAME/golden-river-perfume.git
cd golden-river-perfume
```

---

### Step 2 — Install Dependencies

```bash
# Root (optional concurrent runner)
npm install

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

---

### Step 3 — Configure Environment Variables

#### Frontend (`client/.env`)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_BRAND_NAME=Golden River Perfume
```

#### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development

# TODO: Your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/goldenriver

# TODO: Your Gmail credentials (use App Passwords)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password

# TODO: Where form submissions get sent
EMAIL_RECEIVER=admin@goldenriverperfume.com

# TODO: Frontend URL (update when deploying)
FRONTEND_URL=http://localhost:3000
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords → Generate for "Mail"

---

### Step 4 — Start the Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev     # Uses nodemon for auto-reload
```
✅ Server running at: http://localhost:5000

**Terminal 2 — Frontend:**
```bash
cd client
npm start
```
✅ App running at: http://localhost:3000

---

## ✏️ TODO Checklist — Required Customizations

### 1. 📦 Product Data
Edit `client/src/data/products.js`:
- [ ] Replace dummy perfume names with real product names
- [ ] Update descriptions, prices, sizes, notes
- [ ] Replace Unsplash image URLs with real product photos
- [ ] Add/remove products as needed

### 2. 📧 Contact Details
- [ ] `server/.env` → `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_RECEIVER`
- [ ] `client/src/components/Footer.js` → Address, phone, email, social links
- [ ] `client/src/pages/Contact.js` → Address, phone, email, business hours

### 3. 🌐 API URL
- [ ] `client/.env` → `REACT_APP_API_URL` (update after deploying backend to Render)

### 4. 🖼️ Images & Branding
- [ ] `client/public/index.html` → Replace OG image meta tag
- [ ] All pages → Replace Unsplash placeholder images with real product/brand photos
- [ ] Add your actual logo (replace text-based logo in Navbar & Footer)
- [ ] `client/tailwind.config.js` → Adjust brand colors if needed
- [ ] `client/src/index.css` → Update Google Fonts if you prefer different typefaces

### 5. 💳 Payment Gateway
- [ ] `client/src/components/CartDrawer.js` → Replace `handleCheckout` with Razorpay, Stripe, or PayPal integration

### 6. 🤖 Chatbot
- [ ] `client/src/components/Chatbot.js` → Connect to Dialogflow, OpenAI, or Botpress for real AI responses

### 7. 🗺️ Google Maps
- [ ] `client/src/pages/Contact.js` → Embed real Google Maps iframe

---

## 🚀 Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Set **Root Directory** to `client`
4. Add environment variable:
   - `REACT_APP_API_URL` = your Render backend URL (e.g. `https://golden-river-api.onrender.com`)
5. Click Deploy ✅

---

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add all environment variables from `server/.env` in the Render dashboard
5. Click Deploy ✅
6. Copy the Render URL (e.g. `https://golden-river-api.onrender.com`)
7. Update `REACT_APP_API_URL` in your Vercel project settings
8. Update `FRONTEND_URL` in Render to your Vercel URL

---

## 🐙 GitHub Push Instructions

```bash
# Initialize repo (if not already)
git init
git add .
git commit -m "feat: initial Golden River Perfume project"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/golden-river-perfume.git
git branch -M main
git push -u origin main
```

> ⚠️ Make sure `.env` files are in `.gitignore` before pushing!

---

## 🎬 Promotional Video Script (30–60 seconds)

### Title: *"Wear the Scent of Gold"*
### Genre: Luxury brand atmospheric

---

**[Scene 1 — 0:00–0:08]**
*Visual*: Extreme close-up of golden liquid filling a crystal bottle. Slow motion. Warm backlit glow.  
*Voiceover*: *"Some fragrances are made. Ours are discovered."*  
*Subtitle*: `Some fragrances are made. Ours are discovered.`  
*Music*: Soft, deep cello note begins to swell.

---

**[Scene 2 — 0:08–0:18]**
*Visual*: Time-lapse of oud forest at dawn. Dew on petals. Hands harvesting Bulgarian roses.  
*Voiceover*: *"From the forests of Cambodia to the rose valleys of Bulgaria..."*  
*Subtitle*: `From Cambodia. From Bulgaria. From the world's rarest gardens.`  
*Music*: Gentle orchestral strings layer in.

---

**[Scene 3 — 0:18–0:30]**
*Visual*: Master perfumer blending oils. Laboratory glassware. Close-up of concentrated amber liquid. Then cut to bottle being sealed.  
*Voiceover*: *"...crafted by master perfumers who have spent decades in the art of the invisible."*  
*Subtitle*: `Crafted by masters. Bottled for those who dare to be remembered.`  
*Music*: Full orchestral swell — dramatic, luxurious.

---

**[Scene 4 — 0:30–0:45]**
*Visual*: A woman in an elegant gold dress spraying the perfume. She walks through a sunlit corridor. Slow motion hair movement. Confident, unhurried.  
*Voiceover*: *"Golden River Perfume. A scent that stays long after you've left the room."*  
*Subtitle*: `Golden River Perfume — A scent that stays long after you've left.`  
*Music*: Music reaches peak, begins to gently fade.

---

**[Scene 5 — 0:45–0:58]**
*Visual*: Product lineup on black marble. Logo appears with golden shimmer effect.  
*Voiceover*: *"Discover the collection. Wear what cannot be forgotten."*  
*Subtitle*: `goldenriverperfume.com`  
*Text on screen*: **GOLDEN RIVER** | *Perfume* | `Explore the Collection →`  
*Music*: Final deep orchestral note fades to silence.

---

**🎵 Background Music Suggestion**:  
- *"Experience" by Ludovico Einaudi* (instrumental, royalty-free version)  
- Or search: "luxury perfume commercial background music" on Pixabay / Epidemic Sound  
- Tone: Cinematic, slow, orchestral with warm low tones. Not upbeat. Not electronic.

---

## 🛠 Tech Stack Summary

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React 18, React Router |
| Styling    | Tailwind CSS           |
| Animations | CSS keyframes          |
| Cart       | React Context + LocalStorage |
| Backend    | Node.js, Express 4     |
| Database   | MongoDB (Mongoose)     |
| Email      | Nodemailer             |
| Security   | Helmet, CORS, Rate Limiting |
| Deploy FE  | Vercel                 |
| Deploy BE  | Render                 |

---

## 📞 Support

For questions, open a GitHub issue or email: `hello@goldenriverperfume.com`  
*(TODO: Replace with your actual support email)*
