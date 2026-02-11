import express from "express";
import { addfood, foodlist, removeItem } from "../controllers/foodcontrollers.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const foodroute = express.Router();

foodroute.post("/add", auth, upload.single("image"), addfood);
foodroute.get("/list", foodlist);
foodroute.post("/remove", auth, removeItem);

export default foodroute;
