import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class UserRepository{

    static async signUp(newUser){
        try{
            //1. Get the database
            const db=getDB();
            //2. get the collection
            const collection=db.collection('users');
            //3.insert the document
            await collection.insertOne(newUser);
            return newUser;
        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }

    static async findByEmail(email){
        try{
            //1. Get the database
            const db=getDB();
            //2. get the collection
            const collection=db.collection('users');

            return await collection.findOne({email});

        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
    
    static async signIn(email,password){
        try{
            //1. Get the database
            const db=getDB();
            //2. get the collection
            const collection=db.collection('users');

            return await collection.findOne({email,password});

        }catch(err){
            throw new ApplicationError("Something Went Wrong",500);
        }
    }

}