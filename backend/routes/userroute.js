import express from 'express';
import { loginUser,signupUser } from '../controllers/usercontroller.js';

let userroute=express.Router();

userroute.post('/login',loginUser);
userroute.post('/signup',signupUser);


export default userroute;
