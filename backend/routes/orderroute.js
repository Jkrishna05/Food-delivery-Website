import express from 'express';
import {  placeOrder, user_order,listorder, updateStatus } from '../controllers/ordercontroller.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();
orderRouter.post('/placeorder',auth,placeOrder);
// orderRouter.post('/verify',order_verify);
orderRouter.post('/userorder',auth,user_order);
orderRouter.get('/allorders',listorder);
orderRouter.post('/status',updateStatus);
export default  orderRouter;