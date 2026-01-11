import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbconnect } from "./config/db.js";

import foodroute from "./routes/foodroute.js";
import userroute from "./routes/userroute.js";
import cartroute from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

dotenv.config();
dbconnect();

const app = express();

/* ================= STRIPE WEBHOOK ================= */

app.use(
  "/api/order/webhook",
  express.raw({ type: "application/json" })
);

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL
    ],
    credentials: true
  })
);

app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/food", foodroute);
app.use("/api/user", userroute);
app.use("/api/cart", cartroute);
app.use("/api/order", orderRouter);

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
