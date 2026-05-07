const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Order = require('../models/Order');

// Create transporter with email credentials
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// POST /api/order
router.post('/', async (req, res) => {
  try {
    console.log("📥 Order:", req.body);

    const order = new Order({
      ...req.body,
      orderId: "GR-" + Date.now()
    });

    await order.save();
    console.log("✅ Order saved");

    // 📧 Send email (non-blocking — don't fail the order if email fails)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter();
      console.log('📧 Attempting to send order email to:', order.email);
      transporter.sendMail({
        from: `"Golden River" <${process.env.EMAIL_USER}>`,
        to: order.email,
        replyTo: process.env.EMAIL_USER,
        subject: "Order Confirmation - Golden River Perfume",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a1813; color: #f8f4e8; padding: 40px; border: 1px solid #d4a017;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.2em; color: #d4a017; text-transform: uppercase; margin: 0;">Golden River</h1>
              <p style="font-size: 10px; letter-spacing: 0.4em; color: #f8f4e840; text-transform: uppercase;">Order Confirmation</p>
            </div>
            <p style="font-size: 16px; font-weight: 300; color: #f0e9cc; margin-bottom: 16px;">Dear ${order.name},</p>
            <p style="color: #f8f4e8b0; line-height: 1.8; margin-bottom: 20px;">Thank you for your order! Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 12px 0; color: #d4a017; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid #25221840; width: 30%;">Order ID</td>
                <td style="padding: 12px 0; color: #f8f4e8; font-size: 14px; border-bottom: 1px solid #25221840;">${order.orderId}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #d4a017; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid #25221840;">Product</td>
                <td style="padding: 12px 0; color: #f8f4e8; font-size: 14px; border-bottom: 1px solid #25221840;">${order.productName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #d4a017; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid #25221840;">Size</td>
                <td style="padding: 12px 0; color: #f8f4e8; font-size: 14px; border-bottom: 1px solid #25221840;">${order.size}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #d4a017; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 1px solid #25221840;">Price</td>
                <td style="padding: 12px 0; color: #d4a017; font-size: 14px; border-bottom: 1px solid #25221840; font-weight: bold;">₹${order.price}</td>
              </tr>
            </table>
            <p style="color: #f8f4e8b0; line-height: 1.8; margin-bottom: 20px;">We'll process your order shortly and keep you updated on the shipping status.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'https://golden-river-perfume.com'}" style="background: #d4a017; color: #0f0e0b; padding: 12px 32px; text-decoration: none; display: inline-block;">Track Order</a>
            </div>
            <div style="margin-top: 30px; text-align: center; color: #f8f4e840; font-size: 11px; letter-spacing: 0.1em;">
              © ${new Date().getFullYear()} Golden River Perfume · Thank you for your purchase
            </div>
          </div>
        `
      })
        .then(info => {
          console.log('✅ Order email sent:', info.messageId);
        })
        .catch(err => {
          console.error('❌ Order email failed:', err.message, err.code);
        });
    } else {
      console.log('⚠️  Email not configured — skipping email send. Check .env file.');
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

module.exports = router;