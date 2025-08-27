import { log } from "console";
import foodModel from "../models/foodmodel.js";
import fs from 'fs/promises';
import path from 'path';

let addfood=async(req,res)=>{
    if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
    let img=`${req.file.filename}`
    let food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:img
    })
    try {
        await food.save();
        res.json({success:true,message:'food added'})
    } catch (error) {
       console.log(error);
         res.json({success:false,message:'error'})
    }

}
let foodlist=async(req,res)=>{
    try {
         let  foods= await foodModel.find({});
         res.json({success:true,message:foods})
    } catch (error) {
        res.jason({success:false,message:'error'})
    }
}

// let removeItem=async(req,res)=>{
//     try {
//         let food= await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`)
//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({success:true,message:'food removed'})
//     } catch (error) { 
//         res.json({success:false,message:'error'})
//     }
// } 


let removeItem = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ success: false, message: 'ID is required' });
    }

    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    console.log("food.image:", food.image);

    const imagePath = path.join(process.cwd(), 'uploads', food.image);
    console.log("Deleting:", imagePath);

    try {
      await fs.unlink(imagePath);
      console.log("Image deleted successfully");
    } catch (err) {
      console.error("Could not delete file:", err.message);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food removed' });

  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export {addfood,foodlist,removeItem}