import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OrderModel{
    constructor(UserId,totalAmount,timestamp){
        this.UserId=UserId;
        this.totalAmount=totalAmount;
        this.timestamp=timestamp;
    }

}