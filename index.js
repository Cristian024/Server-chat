import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

import socketHandlers from './src/socketHandlers.js';

const port = process.env.port || 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    },
    cookie: {
        name: 'session',
        httpOnly: true,
        maxAge: 8640000
    },
    connectTimeout: 50000
});

socketHandlers(io);

app.use(cors({
    origin: "*"
}));

app.use(logger('dev'));

app.get('/', (req, res)=>{
    res.send('Chat server  :)')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
