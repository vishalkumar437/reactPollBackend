const mongoose =require("mongoose")
const {isEmail}=require('validator');

// creating user schema
const userSchema= new mongoose.Schema({

    createdPollIds:{
        type:Array,
    },
    participatedPollIds:{
        type:Array,
    },
    
    email:{
        
        type:String,
        required:true,
        unique:true,
        validate: [isEmail,"please Enter valid Email"],

    },
    password:{
        type:String,
        required:true,  
        minLength:[4,"Password  minimum lenght should be 4"] 
    },

    profileUrl:{
        type:String,
    },

    name:{
        type:String,
        required:true,
    }



})

 module.exports =mongoose.model('user',userSchema);

