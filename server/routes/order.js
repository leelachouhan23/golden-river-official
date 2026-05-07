const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const Order = require('../models/Order');

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/order
router.post('/', async (req, res) => {

  try {

    console.log("📥 Order:", req.body);

    // SAVE ORDER
    const order = new Order({
      ...req.body,
      orderId: "GR-" + Date.now()
    });

    await order.save();

    console.log("✅ Order saved");

    // SEND EMAIL
    try {

      const data = await resend.emails.send({

        from: 'Golden River <onboarding@resend.dev>',

        to: order.email,

        subject: 'Your Order is Confirmed 🎉',

        html: `
          <div style="font-family:Arial;padding:20px;max-width:600px;margin:auto;">

            <h1 style="color:#d4a017;">
              Golden River Perfume
            </h1>

            <h2>Order Confirmed ✅</h2>

            <p>Hello <b>${order.name}</b>,</p>

            <p>Your order has been confirmed successfully.</p>

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

            <p>Thank you for shopping with Golden River ❤️</p>

          </div>
        `
      });

      console.log("✅ Email sent:", data);

    } catch (mailErr) {

      console.log("❌ Mail Error:", mailErr);

    }

    // RESPONSE
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });

  } catch (err) {

    console.error("❌ FULL ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Order failed",
    });

  }

});

module.exports = router;