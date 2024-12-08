import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const userModel=mongoose.model('users',userSchema);

export default class UserRepository{
    static async resetpassword(userId,hashedPassword){
        try{
            let user=await userModel.findById(userId);
            if(user){
                user.password=hashedPassword;
                user.save();
            }else{
                throw new Error("User not found");
            }

        }catch(err){
            console.log(err);
        }
    }

    static async signUp(newUser){
        try{
            const user=new userModel(newUser);
            await user.save();
            return user;
        }catch(err){
            console.log(err);
        }
    }

    static async findByEmail(email){
        try{
            return await userModel.findOne({email});
        }catch{err}{
            console.log(err);
        }
    }
}
