import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import { dbconnect } from './config/db.js';
import foodroute from './routes/foodroute.js';
import userroute from './routes/userroute.js';
import cartroute from './routes/cartroute.js';
import orderRouter from './routes/orderroute.js';
import { webhookHandler, stripeWebhook } from "./controllers/ordercontroller.js";
import bodyParser from "body-parser";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Force dotenv to load from backend/.env
dotenv.config({ path: join(__dirname, '.env') });
console.log("Loaded Stripe Key:", process.env.STRIPE_SECRET_KEY);

let app = express();
dbconnect();

// ✅ Stripe webhook needs raw body
app.post("/webhook",
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

app.use(cors());
app.use(express.json());

app.use('/image', express.static('uploads'));

app.use('/api/food', foodroute);
app.use('/api/user', userroute);
app.use('/api/cart', cartroute);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('api');
});

app.listen(3000, () => {
  console.log(`✅ Server started on http://localhost:3000`);
});


// ✅ normal routes after webhook
