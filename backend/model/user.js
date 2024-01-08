const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required:true,
        // validate:validator.isEmail

    },
    password:{
        type:String,
        required:true,
        // select: false, //when we run find() method password will not be returned/accessed
    },
    links:[
        {
            ref:'Link',
            type:mongoose.Types.ObjectId
        }
    ]
    
})