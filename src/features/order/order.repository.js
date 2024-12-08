import { getDB } from "../../config/mongodb.js";
import { ObjectId, Timestamp } from "mongodb";
import OrderModel from "./order.model.js";
export default class OrderRepository{
    static async placeOrder(userId){
        //1. get the cartItems and Calculate total price.
        const items= await this.getTotalAmount(userId);
        const totalfinalPrice=items.reduce((sum,item)=>sum+item.totalPrice,0);

        //2. create an order record.
        const db=getDB();
        const newOrder= new OrderModel(new ObjectId(userId),totalfinalPrice,new Date());
        await db.collection("orders").insertOne(newOrder,);

        //3. Reduce the stock.
        for(let item of items){
            await db.collection("products").updateOne(
                {_id:item.productId},
                {$inc:{stock:-item.quantity}}
            )
        }

        //4. clear the cart
        await db.collection("cartItems").deleteMany(
            {userId:new ObjectId(userId)}
        )
        
        return;
    }

    static async getTotalAmount(userId){
        const db=getDB();

        const items= await db.collection('CartItems').aggregate([
            {
                $match:{userId: new ObjectId(userId)}
            },
            //get the products from products collections
            {
                $lookup:{
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"ProductInfo"
                }
            },
            //
            {
                $unwind:"$ProductInfo"
            },
            {
                $addFields:{
                    "totalPrice":{
                        $multiply:["$ProductInfo.price","$quantity"]//quantity*price
                    }
                }
            }

        ]).toArray();
        const totalfinalPrice=items.reduce((sum,item)=>sum+item.totalPrice,0);
        return items;
    }
}