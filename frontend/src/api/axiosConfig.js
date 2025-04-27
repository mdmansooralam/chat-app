import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://chat-app-0sp3.onrender.com/api',
    withCredentials:true,
    
})

export default axiosInstance