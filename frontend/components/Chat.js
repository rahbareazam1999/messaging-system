// frontend/src/components/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);

    // Listen for incoming messages and typing events
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [message, ...prevMessages]);
        });

        socket.on('typing', () => {
            setTyping(true);
            setTimeout(() => setTyping(false), 1000); // Show "Typing..." for 1 second
        });

        // Cleanup on component unmount
        return () => {
            socket.off('receiveMessage');
            socket.off('typing');
        };
    }, []);

    // Function to handle sending a message
    const sendMessage = (messageContent) => {
        const message = {
            content: messageContent,
            senderId: "your-user-id", // Replace with actual user ID
            receiverId: "receiver-user-id", // Replace with actual receiver ID
            createdAt: new Date(),
        };

        socket.emit('sendMessage', message);
        setMessages((prevMessages) => [message, ...prevMessages]);
    };

    // Function to handle typing indicator
    const handleTyping = () => {
        socket.emit('typing');
    };

    return (
        <div className="chat-container">
            <MessageList messages={messages} typing={typing} />
            <MessageInput onSend={sendMessage} onTyping={handleTyping} />
        </div>
    );
};

export default Chat;
