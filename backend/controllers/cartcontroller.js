import userModel from "../models/userModel.js";

let adduserCart=async(req,res)=>{
    try {
        let user= await userModel.findOne({ _id:req.body.userId });
          if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        let cartdata=await user.cartdata;
        if (!cartdata[req.body.Itemid]) {
            cartdata[req.body.Itemid] = 1;
        }
        else{
            cartdata[req.body.Itemid] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({ success: true, message: 'Item added to cart successfully', cartdata });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong', error: error.message });
        console.log(error);
    }
} 

let removeuserCart=async(req,res)=>{
    try {
        let user= await userModel.findOne({ _id:req.body.userId });
          if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        let cartdata=await user.cartdata;
        if(cartdata[req.body.Itemid]===0){
            delete cartdata[req.body.Itemid];
        }
        if (cartdata[req.body.Itemid]>0) {
            cartdata[req.body.Itemid] -= 1;
        }
    
        await userModel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({ success: true, message: 'Item removed successfully', cartdata });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong' });
        console.log(error);
    }
}

let getCart=async(req,res)=>{
   try {
        let user = await userModel.findOne({ _id: req.body.userId });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, cartdata: user.cartdata,message: 'Cart data fetched successfully' });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong' });
        console.log(error);
    }
}


export { adduserCart, removeuserCart, getCart };