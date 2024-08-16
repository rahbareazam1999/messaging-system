// backend/models/Message.js
const { drizzleTable, integer, text, timestamp, boolean } = require('drizzle-orm/pg');

const Message = drizzleTable('messages', {
    id: integer('id').primaryKey().autoIncrement(),
    senderId: text('sender_id').notNull(),
    receiverId: text('receiver_id').notNull(),
    content: text('content').notNull(),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

module.exports = Message;
