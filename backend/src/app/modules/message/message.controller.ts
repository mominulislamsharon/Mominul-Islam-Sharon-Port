import { Request, Response } from 'express';
import { MessageService } from './message.service';
import nodemailer from 'nodemailer';
import config from '../../../config';

const getAllMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await MessageService.getAllMessages();
    res.json({ success: true, data: messages });
  } catch { res.status(500).json({ success: false, message: 'Server error' }); }
};

const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const msg = await MessageService.createMessage({ name, email, message });

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
      });
      await transporter.sendMail({
        from: config.SMTP_USER,
        to: config.ADMIN_EMAIL,
        subject: `📩 New message from ${name}`,
        html: `<h3>From: ${name} (${email})</h3><p>${message}</p>`,
      });
    } catch { /* email failure shouldn't block response */ }

    res.status(201).json({ success: true, data: msg });
  } catch { res.status(500).json({ success: false, message: 'Server error' }); }
};

const markAsRead = async (req: Request, res: Response) => {
  try {
    const msg = await MessageService.markAsRead(req.params.id as string);
    res.json({ success: true, data: msg });
  } catch { res.status(500).json({ success: false, message: 'Server error' }); }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    await MessageService.deleteMessage(req.params.id as string);
    res.json({ success: true, message: 'Deleted' });
  } catch { res.status(500).json({ success: false, message: 'Server error' }); }
};

export const MessageController = {
  getAllMessages, createMessage, markAsRead, deleteMessage,
};
