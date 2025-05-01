import io from 'socket.io-client'

const baseUrl = import.meta.env.VITE_API_URL

const socket = io(baseUrl);
export default socket