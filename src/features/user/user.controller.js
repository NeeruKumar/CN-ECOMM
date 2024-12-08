import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
export default class UserController{

    async resetPassword(req,res){
        const newPassword=req.body.newPassword;
        const userId=req.userId;
        //add custom validation
        const hashedPassword=await bcrypt.hash(newPassword,12);
        try{
            await UserRepository.resetpassword(userId,hashedPassword);
            res.status(200).send('Password is Updated');
        }catch(err){
            console.log(err);
        }

    }

    async signUp(req,res){
        const {name,email,password,type}=req.body;

        const hashedPassword=await bcrypt.hash(password,12);//10-20
        const newUser=new UserModel(name,email,hashedPassword,type);
        await UserRepository.signUp(newUser);
        res.status(201).send(newUser);
    }

    async signIn(req,res){
        try{
        const {email,password}=req.body;
        const user=await UserRepository.findByEmail(email);

        if(!user){
            return res.status(400).send("Invalid Creds");
        }else{
            //JWT token
            const result=await bcrypt.compare(password,user.password);
            if(result){
                const token=jwt.sign(
                    {
                    userID:user._id,
                    email:email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:'1h',
                }
                );
                return res.status(200).send(token);
            }else{
                return res.status(400).send("Invalid Creds");
            }
        }
        }catch(err){
            next(err);
        }
    }
}