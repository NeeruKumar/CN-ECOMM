
import CartItemsModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";
export default class CartItemsController{
        async add(req,res,next){
            try{
                const userId=req.userId;
                const {productId,quantity}=req.query;
                const item=await CartItemsRepository.add(productId,userId,parseFloat(quantity));
                console.log(item);

                res.status(200).send("Cart is Updated");
            }catch(err){
                next(err);
            }

        }
        async get(req,res,next){
            try{
                const userId=req.userId;
                console.log(userId);
                const items=await CartItemsRepository.get(userId);
                res.status(200).send(items);
            }catch(err){
                next(err);
            }
        }
        async delete(req,res){
            const userId=req.userId;
            const cartItemId=req.params.id;
            const isDeleted=await CartItemsRepository.delete(userId,cartItemId);

            if(!isDeleted){
                return res.status(404).send("Item Not Found");
            }
            return res.status(200).send("Cart item is deleted");

        }

}