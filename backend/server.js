import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbconnect } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




import foodroute from "./routes/foodroute.js";
import userroute from "./routes/userroute.js";
import cartroute from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

dotenv.config();
dbconnect();

const app = express();
app.use(
  "/api/order/webhook",
  express.raw({ type: "application/json" })
);
app.use("/image", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use("/image", express.static("uploads"));

app.use("/api/food", foodroute);
app.use("/api/user", userroute);
app.use("/api/cart", cartroute);
app.use("/api/order", orderRouter);

app.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
