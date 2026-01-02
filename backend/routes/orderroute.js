import express from "express";
import {
  placeOrder,
stripeWebhook,
  user_order,
  listorder,
  updateStatus,
} from "../controllers/ordercontroller.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.post("/webhook", stripeWebhook);
orderRouter.post("/placeorder", auth, placeOrder);
// router.post("/verify", auth, verifyOrder);
orderRouter.post("/userorder", auth, user_order);
orderRouter.get("/allorders", listorder);
orderRouter.post("/status", updateStatus);

export default orderRouter;
