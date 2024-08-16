// backend/controllers/messageController.js
const Message = require('../models/Message');
const db = require('../config/db');

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    const newMessage = await db.insertInto(Message).values({
        senderId,
        receiverId,
        content,
    }).returning().execute();

    res.status(201).json(newMessage);
};

exports.getMessages = async (req, res) => {
    const { userId } = req.params;
    const messages = await db.selectFrom(Message)
        .where('receiverId', '=', userId)
        .orderBy('createdAt', 'desc')
        .execute();

    res.status(200).json(messages);
};
