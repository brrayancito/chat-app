import express from "express";
import { Server } from "socket.io";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`);
});
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === "production" 
            ? false 
            : ["http://localhost:8080", "http://127.0.0.1:8080"]
    }
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    // Upon connection - Only to user
    socket.emit('message', `Welcome to the chat, ${socket.id.substring(0, 5)}`);

    // Upon connection - To all users except the user
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} has joined the chat`);

    // Listening for messages from client - To all users
    socket.on('message', data => {
        console.log(data);
   
        io.emit('message', `${socket.id.substring(0, 5)} said: ${data}`);
    })

    // Listening for typing from client - To all users
    socket.on('typing', userId => {
        socket.broadcast.emit('typing', `${userId} is typing...`);
    })



    // Upon disconnection - To all users
    // socket.on('disconnect', () => {
    //    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} has left the chat`);
    // });
});