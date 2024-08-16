// backend/routes/messageRoutes.js
const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

router.post('/send', sendMessage);
router.get('/:userId', getMessages);

module.exports = router;
