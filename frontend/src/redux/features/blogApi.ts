import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image?: string;
  status: 'published' | 'draft';
  slug: string;
  createdAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) {
        headers.set('Authorization', `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => '/blogs',
      transformResponse: (res: { data: Blog[] }) => res.data,
      providesTags: ['Blog'],
    }),
    getAllBlogsAdmin: builder.query<Blog[], void>({
      query: () => '/blogs/admin/all',
      transformResponse: (res: { data: Blog[] }) => res.data,
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query<Blog, string>({
      query: (id) => `/blogs/${id}`,
      transformResponse: (res: { data: Blog }) => res.data,
    }),
    createBlog: builder.mutation<Blog, FormData>({
      query: (body) => ({ url: '/blogs', method: 'POST', body }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation<Blog, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: `/blogs/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({ url: `/blogs/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetAllBlogsAdminQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
