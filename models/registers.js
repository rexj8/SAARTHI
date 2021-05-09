const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

//creating collection

const Register = new mongoose.model("Register", loginSchema)
// here both Register should be Capital  ||
//                                       ||
//                                       \/
//                                 Collection name    

module.exports= Register