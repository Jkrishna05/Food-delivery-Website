import mongoose from "mongoose";
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cartdata:{type:Object,default:{}}
  
},{minimize:false})

let userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;