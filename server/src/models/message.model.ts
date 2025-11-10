import mongoose from 'mongoose';

export interface IMessage extends Document {
  roomId: string;
  senderId: string;
  message: string;
  createdAt: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    roomId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
