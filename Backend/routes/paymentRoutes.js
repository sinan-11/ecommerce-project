import { Router } from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";

const router = Router();

// 1. Create Order
router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Verify Payment
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// 3. Webhook
router.post("/webhook", (req, res) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.body) // raw body needed
    .digest("hex");

  if (expectedSignature === req.headers["x-razorpay-signature"]) {
    const event = JSON.parse(req.body);

    if (event.event === "payment.captured") {
      console.log("Payment captured:", event.payload.payment.entity);
    }

    res.json({ status: "ok" });
  } else {
    res.status(400).json({ error: "Invalid webhook signature" });
  }
});

export default router;