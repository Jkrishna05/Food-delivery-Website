import mongoose from "mongoose";
import _default from "validator";
 let orderSchema= new mongoose.Schema({
    userId:{type:String,required:true},
    Items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:'Food Processing'},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
 })
 let orderModel=mongoose.models.order ||  mongoose.model('order',orderSchema);
 export default orderModel;