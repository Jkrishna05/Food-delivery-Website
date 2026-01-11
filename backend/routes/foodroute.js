import express from "express";
import { addfood, foodlist, removeItem } from "../controllers/foodcontrollers.js";
import upload from "../middleware/upload.js";

const foodroute = express.Router();

foodroute.post("/add", upload.single("image"), addfood);
foodroute.get("/list", foodlist);
foodroute.post("/remove", removeItem);

export default foodroute;
