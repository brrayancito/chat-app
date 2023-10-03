import { createServer } from "node:http";
import { Server} from "socket.io";

const server = new createServer();
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === "production" 
            ? false 
            : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    socket.on('message', data => {
        console.log(data);
   
        io.emit('message', `${socket.id} said: ${data}`);
    })
});

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}...`)
})