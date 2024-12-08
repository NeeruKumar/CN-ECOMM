import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel{

    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }

    

    

    static getAll(){
        return users;
    }

}

var users=[{
    id:1,
    name:"Neeru Kumar",
    email:"abc@gmail.com",
    password:"1234",
    type:"seller"
}]