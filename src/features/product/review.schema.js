import mongoose from "mongoose";

export const reviewScehma=mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    rating:Number
})