import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String, 
        default:''
    },
    password:{
        type:String,
        required:true,
        minLength:6,   
    }
},{timestamps:true})


const User = mongoose.model('User', userSchema)
export default User