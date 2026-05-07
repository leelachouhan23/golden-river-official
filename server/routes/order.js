const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Order = require('../models/Order');

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify transporter
transporter.verify((err, success) => {
  if (err) {
    console.log("❌ Email config error:", err.message);
  } else {
    console.log("📧 Email server ready");
  }
});

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

    // ✅ TEST EMAIL
    console.log("📧 Sending test email...");

    const testInfo = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "leelachouhan23@navgurukul.org",
      subject: "Test Mail",
      text: "Email working successfully"
    });

    console.log("✅ Test mail sent:", testInfo.response);

    // ✅ USER EMAIL CHECK
    console.log("USER EMAIL:", order.email);

    // ✅ SEND ORDER CONFIRMATION EMAIL
    try {

      const info = await transporter.sendMail({
        from: `"Golden River" <${process.env.EMAIL_USER}>`,
        to: order.email,
        subject: "Your Order is Confirmed 🎉",

        html: `
          <div style="font-family:Arial;padding:20px;max-width:600px;margin:auto;">
            
            <h1 style="color:#d4a017;">
              Golden River Perfume
            </h1>

            <h2>Order Confirmed ✅</h2>

            <p>Hello <b>${order.name}</b>,</p>

            <p>
              Your order has been confirmed successfully.
            </p>

            <img 
              src="${order.image}" 
              alt="${order.productName}"
              style="width:200px;border-radius:10px;margin:20px 0;"
            />

            <h3>${order.productName}</h3>

            <p><b>Size:</b> ${order.size}</p>

            <p><b>Price:</b> ₹${order.price}</p>

            <p><b>Order ID:</b> ${order.orderId}</p>

            <hr />

            <p>
              Thank you for shopping with Golden River ❤️
            </p>

          </div>
        `
      });

      console.log("✅ Email sent:", info.response);

    } catch (mailErr) {

      console.log("❌ Mail Error:", mailErr.message);

    }

    // ✅ RESPONSE
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