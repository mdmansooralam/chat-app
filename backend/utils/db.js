import mongoose from "mongoose";

const connection = async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('db connected')

    } catch (error) {
        console.log('error from database connection : ', error)
    }
}


export default connection