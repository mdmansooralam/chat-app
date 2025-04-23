import User from '../models/user.model.js'
import cloudinary from '../utils/cloudinary.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const  signup = async(req, res)=>{
    const {name, email, password} = req.body
    try {
        if(!name | !email | !password){return res.status(400).json({message:'all fields are required'})}
        if(password.length <6){return res.status(400).json({message:'password length should be atleast 6'})}

        const user = await User.findOne({email})
        if(user){return res.status(400).json({message:'email already exist'})}

        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({name, email, password:hashedPassword})
        await newUser.save()

        generateToken(newUser._id, res)
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        console.log('Error in Singup : ', error)
        res.status(500).json({message:'server error'})
    }
}
export const  login = async(req, res)=>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){return res.status(400).json({message:'invalid credentials'})}

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){return res.status(400).json({message:'invalid credentials'})}

        generateToken(user._id, res)
        res.status(200).json(user)

    } catch (error) {
        console.log('Error in login : ', error)
        res.status(500).json({message:'internal server error'})
    }
}
export const  logout = (req, res)=>{
    try {
        res.cookie('token', '0', {maxAge:0})
        res.status(200).json({message:'logout successful'})
    } catch (error) {
        console.log('Error in logout : ', error)
        res.status(500).json({message:'internal server error'})
    }
}

export const checkAuth = (req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log('Error in checkAuth controller : ', error)
        res.status(500).json({message:'Internal server error'})
    }
}

export const updateProfile = async(req, res)=>{
    const {profilePic} = req.body
    const image =  await cloudinary.uploader.upload(profilePic)
    
}