import mongoose, { type Date } from 'mongoose';

export interface IChatRoom extends Document {
  roomId: string;
  listingId: string;
  participants: string[];
  createdAt: Date;
  lastMessage: string;
  lastUpdated: Date;
}

const chatRoomSchema = new mongoose.Schema<IChatRoom>(
  {
    roomId: { type: String, unique: true },
    listingId: { type: String },
    participants: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    lastMessage: { type: String },
    lastUpdated: { type: Date, default: Date.now() },
  },
  { timestamps: true },
);

const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);

export default ChatRoom;
