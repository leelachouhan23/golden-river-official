const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const Contact = require('../models/Contact');
const { sendAdminNotification, sendAutoReply } = require('../services/emailService');

// Rate limiter: max 5 contact form submissions per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});
const SUBJECT_OPTIONS = ['feedback', 'enquiry', 'support', 'order'];
// Validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 20 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 3, max: 2000 }),
  body('subject').optional().trim().isIn(SUBJECT_OPTIONS).withMessage('Invalid subject selected').isLength({ max: 20 }),
];

// ─── POST /api/contact ──────────────────────────────────────────────────
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }

  const { name, email, subject, message } = req.body;

  // 🔍 DEBUG (optional but useful)
  console.log("Incoming contact data:", req.body);

  try {
    // 1. Save to MongoDB
    const contact = new Contact({
      name,
      email,
      subject: subject || 'General Enquiry',
      message,
      ip: req.ip,
    });
    await contact.save();

    // 2. Send emails (non-blocking — don't fail the response if email fails)
    const emailPromises = [];

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('📧 Attempting to send contact emails to:', email);
      emailPromises.push(
        sendAdminNotification({
          name,
          email,
          subject: subject || 'General Enquiry',
          message
        })
          .then(info => console.log('✅ Admin notification sent:', info.messageId))
          .catch(err =>
            console.error('❌ Admin email failed:', err.message)
          )
      );
      emailPromises.push(
        sendAutoReply({ name, email })
          .then(info => console.log('✅ Auto-reply sent:', info.messageId))
          .catch(err =>
            console.error('❌ Auto-reply failed:', err.message)
          )
      );
      await Promise.allSettled(emailPromises);
    } else {
      console.log('⚠️  Email not configured — skipping email send. Check .env file.');
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We\'ll be in touch shortly!',
      id: contact._id,
    });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong on our end. Please try again later.',
    });
  }
});

// ─── GET /api/contact (Admin — list submissions) ────────────────────────
// TODO: Add authentication middleware before deploying this route
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;