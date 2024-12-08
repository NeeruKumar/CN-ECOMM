import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewScehma } from "./review.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { categorySchema } from "./category.schema.js";


const ProductModel = mongoose.model("products",productSchema);
const ReviewModel = mongoose.model('Review',reviewScehma);
const categoryModel=mongoose.model('Category',categorySchema);

export default class ProductRepository{

    //Add a new Product
    static async add(newProduct){
        try{
            //1. Add product into Product collection
            newProduct.categories=newProduct.category.split(',');
            const product=new ProductModel(newProduct);
            const savedProduct=await product.save();

            //2.Update Category
            await categoryModel.updateMany(
                {_id:{$in: newProduct.categories}},
                {$push:{products:savedProduct._id}}
            )

        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }

    //fetch all products
    static async getAll(){
        try{
            const db=getDB();
            const collection=db.collection('products');
            const products=await collection.find().toArray();
            console.log(products);
            return products;
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }

    //fetch specific product
    static async get(id){
        try{
            const db=getDB();
            const collection=db.collection('products');
            const prod= await collection.findOne({_id:new ObjectId(id)});
            return prod;
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
    //Filter product
    static async filter(minPrice, category){
        try{
            const db=getDB();
            const collection=db.collection('products');
            let filterExpression={};
            if(minPrice){//100
                filterExpression.price={$gte:parseFloat(minPrice)}
            }
            // if(maxPrice){
            //     filterExpression.price={...filterExpression.price, $lte:parseFloat(maxPrice)}
            // }
            if(category){//100
                filterExpression={$or:[{category:category},filterExpression]}
            }
            return await collection.find(filterExpression).project({name:1,price:1,category:1,_id:0}).toArray();

        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }

      }

      //Rate a product
       static async rateProduct(userId,productId,rating){
        try{
            const productToUpdate=await ProductModel.findById(productId);
            if(!productToUpdate){
                throw new Error("Product not found");
            }

            //find the existing rating
            const userReview= await ReviewModel.findOne({productID:productId, userID:userId});

            if(userReview){
                userReview.rating=rating;
                userReview.save();
            }else{
                const newReview=new ReviewModel({
                    productID:productId,
                    userID:userId,
                    rating:rating
                });
                newReview.save();
            }


            // const db=getDB();
            // const collection=db.collection('products');

            // await collection.updateOne({_id:new ObjectId(productId)},
            // {$pull:{ratings:{userId:new ObjectId(userId)}}});

            // await collection.updateOne({_id:new ObjectId(productId)},
            // {$push:{ratings:{userId:new ObjectId(userId),rating}}})
           
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }        
      }

      static async averageProductPricePerCategory(){
        try{
            const db=getDB();
            return await db.collection('products').aggregate([
                {
                    $unwind:"$ratings"
                },
                {
                    $group:{
                        _id:"$name",
                        averageRating:{$avg:"$ratings.rating"}
                    }
                }
            ]).toArray();
            // return await db.collection('products').aggregate([
            //     {

            //         $group:{
            //             _id:"$category",
            //             averagePrice:{$avg:"$price"}
            //         }
            //     }
            // ]).toArray();

        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }    
      }
  
}