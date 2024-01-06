const express = require("express");
const http = require("http"); // We cannot directlly app.listen because we going to connect the web socket.
const path = require("path");
const {Server} = require('socket.io')

const app = express();

const server = http.createServer(app);
const io = new Server(server)

io.on('connection', (socket)=>{
    socket.on('chat-msg', (msg)=>{
        io.emit('chat-msg', msg)
    })
    console.log('a user connected');
})

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(`./public/index.html`))
})

server.listen(9000, () => {
  console.log("Server running on PORT 9000");
});
