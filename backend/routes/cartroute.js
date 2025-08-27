import { adduserCart,removeuserCart,getCart } from "../controllers/cartcontroller.js";
import express from "express";
import auth from "../middleware/auth.js";
 
let cartroute=express.Router();


cartroute.post('/add',auth,adduserCart);
cartroute.post('/remove',auth,removeuserCart);
cartroute.post('/get',auth,getCart);


export default cartroute;