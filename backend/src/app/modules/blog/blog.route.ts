import express from 'express';
import multer from 'multer';
import { BlogController } from './blog.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public
router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);

// Admin
router.get('/admin/all', BlogController.getAllBlogsAdmin);
router.post('/', upload.single('image'), BlogController.createBlog);
router.patch('/:id', upload.single('image'), BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);

export default router;
