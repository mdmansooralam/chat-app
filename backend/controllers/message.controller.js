import Message from '../models/message.model.js'
import User from '../models/user.model.js';


export const getMessage = async(req, res)=>{
    try {
        const {id: userChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId:userChatId},
                {senderId: userChatId, receiverId:myId}
            ],
        });
        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in getMessage controller : ', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const sendMessage = async(req, res)=>{
    try {
        const {text, image} = req.body
        const {id : receiverId} = req.params
        const senderId = req.user._id

        const newMessage = new Message({
            text,
            senderId,
            receiverId
        })
        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error in sendMessage controller : ', error)
    }
}

export const getUserForSidebar = async(req, res)=>{
    try {
        const logedInUser = req.user._id
        const filterUser = await User.find({_id : {$ne: logedInUser}}).select('-password')
        res.status(200).json(filterUser)
        
    } catch (error) {
        console.log("Error in getUserForSidebar controller : ", error)
        res.status(500).json({message:'Internal server error'})
    }
}