import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";

export const connectWithMongoose= async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDb is connected using Mongoose");
        addcategories();
    }catch(err){
        console.log(err);
    }
}

async function addcategories() {
    const categoryModel=mongoose.model("Category",categorySchema);
    const categories=await categoryModel.find();
    if(!categories || (categories).length==0){
        await categoryModel.insertMany([{name:"books"},{name:"clothing"},{name:"electronics"}])
    }
    console.log("Categories added");
}