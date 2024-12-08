import mongoose, { Types } from "mongoose";

export const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String, unique:true, required:true,
        match: [/.+\@.+\../,"Please enter valid email"]
    },
    password:{type:String,
        validate:{
            validator:function(value){
             
                return /^(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,120}$/.test(value);
            },
            message:"Password should be btw 8-12 chars and have a special char"
        }
    },
    type:{type:String, enum:["seller","Customer"]}
})

