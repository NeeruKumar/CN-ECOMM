import mongoose from "mongoose"
import { likeSchema } from "./like.schema.js";

const likeModel=mongoose.model('like',likeSchema);

export class LikeRepository{
    static async likeProduct(userId,id){
        const likedProduct=new likeModel({userId:userId,likeable:id,types:'products'});
        const savedProduct=await likedProduct.save();
        return savedProduct;
    }

    static async likeCategory(userId,id){
        const likedCategory=new likeModel({userId:userId,likeable:id,types:'category'});
        const savedCategory=await likedCategory.save();
        return savedCategory;
    }
}