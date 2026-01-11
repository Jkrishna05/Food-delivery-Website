import Stripe from "stripe";
import orderModel from "../models/ordermodel.js";
import userModel from "../models/userModel.js";

// ================= STRIPE INSTANCE =================
const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) throw new Error("❌ STRIPE_SECRET_KEY is missing");
  return new Stripe(stripeKey);
};

const FRONTEND_URL = process.env.FRONTEND_URL;

// ================= PLACE ORDER =================
let placeOrder = async (req, res) => {
  try {
    const stripe = getStripe();
    const userId = req.user.id; // ✅ from auth middleware
    const { Items, address } = req.body;

    if (!Items || Items.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    // Calculate total amount + delivery fee
    const totalAmount = Items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2;

    // Create new order
    const newOrder = new orderModel({
      userId,
      Items,
      amount: totalAmount,
      address,
      payment: false
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartdata: {} });

    // Prepare Stripe line_items
    const line_items = Items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200
      },
      quantity: 1
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${FRONTEND_URL}/order-success?orderId=${newOrder._id}`,
      cancel_url: `${FRONTEND_URL}/order-failed?orderId=${newOrder._id}`,
      metadata: { orderId: newOrder._id.toString() }
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ Place order failed:", error);
    res.status(500).json({ success: false, message: "Order failed", error: error.message });
  }
};

// ================= STRIPE WEBHOOK =================
let stripeWebhook = async (req, res) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    try {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      console.log(`✅ Order ${orderId} marked as paid`);
    } catch (error) {
      console.error("❌ Failed to update order payment:", error);
    }
  }

  res.sendStatus(200); // Stripe only needs 200
};

// ================= GET USER ORDERS =================
let user_order = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ secure
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ALL ORDERS (ADMIN) =================
let listorder = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(403).json({ success: false, message: "Access denied" });

    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE ORDER STATUS (ADMIN) =================
let updateStatus = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(403).json({ success: false, message: "Access denied" });

    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Can't update status" });
  }
};

export { placeOrder, stripeWebhook, user_order, listorder, updateStatus };
