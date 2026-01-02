import Stripe from 'stripe';
import orderModel from "../models/ordermodel.js";
import userModel from "../models/userModel.js";

const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    throw new Error("❌ STRIPE_SECRET_KEY is missing. Check your .env file.");
  }
  return new Stripe(stripeKey);
};

const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';

// ================== PLACE ORDER ==================
let placeOrder = async (req, res) => {
  try {
    const stripe = getStripe();
    const totalAmount = req.body.Items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) + 2;

    let newOrder = new orderModel({
      userId: req.body.userId,
      Items: req.body.Items,
      amount: totalAmount,
      address: req.body.address,
      payment: false
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartdata: {} });

    let food = req.body.Items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100 // ✅ Stripe requires paise
      },
      quantity: item.quantity
    }));

    food.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200 // ₹2 in paise
      },
      quantity: 1
    });

    let session = await stripe.checkout.sessions.create({
      line_items: food,
      mode: 'payment',
      success_url: `${frontend_url}/order-success?orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/order-failed?orderId=${newOrder._id}`,
      metadata: { orderId: newOrder._id.toString() } // ✅ Pass orderId securely
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Order failed', error: error.message });
  }
};

// ================== STRIPE WEBHOOK ==================
// const webhookHandler = (req, res, next) => {
//   // raw body is required for Stripe webhook signature
//   next();
// };

const stripeWebhook = async (req, res) => {
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    try {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      console.log(`✅ Order ${orderId} marked as paid`);
    } catch (error) {
      console.error("❌ Failed to update order:", error);
    }
  }

  res.json({ received: true });
};

// ================== OTHER APIS ==================
let user_order = async (req, res) => {
  try {
    let order = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

let listorder = async (req, res) => {
  try {
    let order = await orderModel.find({});
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

let updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Can't update" });
  }
};

export { placeOrder, stripeWebhook, user_order, listorder, updateStatus };
