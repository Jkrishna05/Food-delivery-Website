import express from "express";
import {
  placeOrder,
stripeWebhook,
  user_order,
  listorder,
  updateStatus,
  verifyOrder,
} from "../controllers/ordercontroller.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.post("/webhook", stripeWebhook);
orderRouter.post("/placeorder", auth, placeOrder);
orderRouter.post("/verify", auth, verifyOrder);

orderRouter.post("/userorder", auth, user_order);
orderRouter.get("/allorders", auth, listorder);
orderRouter.post("/status", auth, updateStatus);

export default orderRouter;
