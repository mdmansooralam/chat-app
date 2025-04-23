import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'


export const protectedRoute = async(req, res , next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){return res.status(401).json({message: 'Token not found'})}

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){return res.status(401).json({message : 'Invalid token provided'})}

        const user = await User.findById(decode.userId).select('-password')
        if(!user){return res.status(404).json({message : 'user not found'})}

        req.user = user
        next()

    } catch (error) {
        console.log('Error in protect middleware : ',error)
        res.status(500).json({message:'internal server error'})
    }
}
