import Blog, { IBlog } from './blog.model';

const getAllBlogs = async (status?: string) => {
  const filter = status ? { status } : { status: 'published' };
  return Blog.find(filter).sort({ createdAt: -1 });
};

const getAllBlogsAdmin = async () => {
  return Blog.find().sort({ createdAt: -1 });
};

const getBlogById = async (id: string) => {
  return Blog.findById(id);
};

const getBlogBySlug = async (slug: string) => {
  return Blog.findOne({ slug, status: 'published' });
};

const createBlog = async (data: Partial<IBlog>) => {
  return Blog.create(data);
};

const updateBlog = async (id: string, data: Partial<IBlog>) => {
  return Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteBlog = async (id: string) => {
  return Blog.findByIdAndDelete(id);
};

export const BlogService = {
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
