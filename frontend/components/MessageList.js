// frontend/src/components/MessageList.js
import React from 'react';

const MessageList = ({ messages, typing }) => {
    return (
        <div className="message-list overflow-y-auto p-4">
            {typing && <p className="text-sm text-gray-500 mb-2">Typing...</p>}
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message my-2 p-2 rounded-md ${
                        message.senderId === "your-user-id" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black"
                    }`}
                >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-600 mt-1">{new Date(message.createdAt).toLocaleTimeString()}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
