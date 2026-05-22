import Message, { IMessage } from './message.model';

const getAllMessages = async () => Message.find().sort({ createdAt: -1 });
const createMessage = async (data: Partial<IMessage>) => Message.create(data);
const markAsRead = async (id: string) =>
  Message.findByIdAndUpdate(id, { read: true }, { new: true });
const deleteMessage = async (id: string) => Message.findByIdAndDelete(id);

export const MessageService = {
  getAllMessages,
  createMessage,
  markAsRead,
  deleteMessage,
};
