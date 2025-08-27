import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';



let loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found or Invalid password' });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'User not found or Invalid password' });
        }
        return res.json({ success: true, message: 'Login successful', token: token(user._id) });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Something went wrong' });
    }
}


let token=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn: '1d' })
}

let signupUser =async(req,res)=>{
    let {name,email,password}=req.body;
    try {
        let exist= await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:'user already exists'})
        }
        if(!validator.isEmail(email)){
           return res.json({success:false,message:'enter a valid email format'}) 
        }
        if(password.length<8){
            return res.json({success:false,message:'enter a strong password'})
        }
         let hashpassword= await bcrypt.hash(password,10);
         let newUser =await userModel.create({
            name:name,
            email:email,
            password:hashpassword
         })
            return res.json({success:true,message:'user created successfully',token:token(newUser._id)})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'something went wrong'});
        
    }
}

export {loginUser,signupUser}