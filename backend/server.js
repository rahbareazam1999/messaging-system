// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const messageRoutes = require('./routes/messageRoutes');
const db = require('./config/db');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(express.json());
app.use('/api/messages', messageRoutes);

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(201).json({ filePath: `/uploads/${req.file.filename}` });
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('typing', (data) => {
        io.emit('typing', data);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
