import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image?: string;
  imagePublicId?: string;
  status: 'published' | 'draft';
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    category: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate slug from title
blogSchema.pre('save', function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
