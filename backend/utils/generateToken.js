import jwt from 'jsonwebtoken'


const generateToken = (userId, res)=>{
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'7d'})
        res.cookie('jwt', token, { 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite:'None',
            secure:true
        })
        return token
    } catch (error) {
        console.log('Error in generateToken : ', error)
        
    }

}

export default generateToken