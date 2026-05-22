import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
