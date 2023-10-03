const ws = require('ws');
const server = new ws.Server({ port: 8080 });

server.on('connection', socket => {
    socket.on('message', message => {
        // console.log(message); // 
        const msg = Buffer.from(message).toString();
        console.log(msg)
        socket.send(`${message} - from server`);
    })
})

console.log("Server started");