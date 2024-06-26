import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'] 
    }
});

io.on('connection', (socket) => {
    console.log('User has connected!');

    socket.on('disconnect', () =>{
        console.log('User has disconnected!');
    })

    socket.on('chat_message', (msg)=>{
        io.emit('chat_message', msg);
    })
});

app.use(cors({
    origin: "*"
}));
app.use(logger('dev'));

app.get('/', (req, res)=>{
    res.send('Chat server  :)')
})

app.get('/prueba', (req, res) =>{
    res.json({"error": null})
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
