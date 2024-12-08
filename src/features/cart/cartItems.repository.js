import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js";


export default class CartItemsRepository{



    //Add element to Cart
    static async add(productId,userId,quantity){
        try{
            const db=getDB();
            const collection=db.collection('CartItems');
            //find the doc
            //either update or insert(upsert)
            const id= await this.getNextCounter(db);

            let data= await collection.updateOne(
            {productId: new ObjectId(productId), userId: new ObjectId(userId)},
            {   $setOnInsert:{_id:id},
                $inc:{quantity:quantity}},
            {upsert:true});
            return data;
            
        }catch(err){
            console.log("data error");
            console.log(err);
            throw new ApplicationError("Something Went Wrong",500);
        }
    }


    //Get Element from Cart
    static async get(userId){
        try{
            const db=getDB();
            const collection=db.collection('CartItems');
            
            return await collection.find({userId:new ObjectId(userId)}).toArray();
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }

    //Delete element from Cart
    static async delete(userId,cartItemId){
        try{
            const db=getDB();
            const collection=db.collection('CartItems');
            const result = await collection.deleteOne({_id:new ObjectId(cartItemId), userId:new ObjectId(userId)});
            return result.deletedCount>0;
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
    static async getNextCounter(db){
        const result=await db.collection('counters').findOneAndUpdate({_id:'cartItems'},
            {$inc:{value:1}},
            {returnDocument:'after'})
            return result.value;
    }

}