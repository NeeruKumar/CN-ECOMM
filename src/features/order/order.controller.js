import OrderRepository from "./order.repository.js";

export default class OrderController{
    async placeOrder(req,res){
        //Complete
        const userId=req.userId;
        await OrderRepository.placeOrder(userId);
        res.send("user is created");
    }
}

//671a611907ace758f0934feb
//671a611907ace758f0934feb