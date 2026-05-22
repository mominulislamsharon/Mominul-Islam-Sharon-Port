import express from 'express';
import { MessageController } from './message.controller';

const router = express.Router();

router.post('/', MessageController.createMessage);           // public
router.get('/', MessageController.getAllMessages);            // admin-only really, but public for now
router.patch('/:id/read', MessageController.markAsRead);
router.delete('/:id', MessageController.deleteMessage);

export default router;
