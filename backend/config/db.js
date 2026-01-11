import mongoose from "mongoose";

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
};
