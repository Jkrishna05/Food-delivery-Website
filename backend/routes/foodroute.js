import express from 'express'
import { addfood,foodlist,removeItem } from '../controllers/foodcontrollers.js'
import multer  from 'multer'


let foodroute=express.Router();

let storage =multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
let upload=multer({storage:storage});

foodroute.post('/add',upload.single('image'),addfood);
foodroute.get('/list',foodlist)
foodroute.post('/remove',removeItem)

export default foodroute;