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

    socket.on('message', data => {
        console.log(data);
   
        io.emit('message', `${socket.id} said: ${data}`);
    })
});