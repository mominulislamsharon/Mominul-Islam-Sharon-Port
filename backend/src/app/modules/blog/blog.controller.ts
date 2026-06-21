import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import { uploadImage, deleteImage } from '../../utils/cloudinary';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogService.getAllBlogs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: blogs,
  });
});

const getAllBlogsAdmin = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogService.getAllBlogsAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All blogs fetched for admin',
    data: blogs,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.getBlogById(req.params.id as string);
  if (!blog) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Blog not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog fetched successfully',
    data: blog,
  });
});

const createBlog = catchAsync(async (req: Request, res: Response) => {
  let imageData = {};
  if (req.file) {
    const uploaded = await uploadImage(req.file.path, 'portfolio/blogs');
    imageData = { image: uploaded.url, imagePublicId: uploaded.public_id };
  }
  const blog = await BlogService.createBlog({ ...req.body, ...imageData });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: blog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  let imageData = {};
  if (req.file) {
    const uploaded = await uploadImage(req.file.path, 'portfolio/blogs');
    imageData = { image: uploaded.url, imagePublicId: uploaded.public_id };
  }
  const blog = await BlogService.updateBlog(req.params.id as string, { ...req.body, ...imageData });
  if (!blog) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Blog not found',
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.getBlogById(req.params.id as string);
  if (!blog) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Blog not found',
    });
  }
  if (blog.imagePublicId) await deleteImage(blog.imagePublicId);
  await BlogService.deleteBlog(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const BlogController = {
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
