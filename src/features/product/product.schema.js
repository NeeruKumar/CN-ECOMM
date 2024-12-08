import mongoose from "mongoose";

export const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    Instock:Number,
    categories:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
        }
    ]
})