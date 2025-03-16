import { urlencoded } from "express";
import mongoose from "mongoose";
import validator from "validator";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator:[validator.isEmail,"Please enter a valid email"],
    },
    phone:{
        type:Number,
        required:true,
        //unique:true,
    },  
    
    //photo data start
    photo:{
        
          type: String
         
        },
      //photo data ends

    education: {
        type:String,
        required:true,
    },
    role:{
            type: String,
            required: true,
            enum:["user", "admin"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8, "Password must be at least 8 characters long"],
    },
    token:{
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
export const User=mongoose.model("User",userSchema);