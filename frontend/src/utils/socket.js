import io from 'socket.io-client'

const baseUrl = 'http://localhost:8000'

const socket = io(baseUrl);
export default socket