import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export interface Project {
  _id: string;
  title: string;
  description: string;
  images: { url: string; publicId: string }[];
  techStack: string[];
  liveUrl?: string;
  frontendGithub?: string;
  backendGithub?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) headers.set('Authorization', `Bearer ${session.accessToken}`);
      return headers;
    },
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      transformResponse: (res: { data: Project[] }) => res.data,
      providesTags: ['Project'],
    }),
    getFeaturedProjects: builder.query<Project[], void>({
      query: () => '/projects/featured',
      transformResponse: (res: { data: Project[] }) => res.data,
    }),
    getProjectById: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      transformResponse: (res: { data: Project }) => res.data,
    }),
    createProject: builder.mutation<Project, FormData>({
      query: (body) => ({ url: '/projects', method: 'POST', body }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; body: FormData }>({
      query: ({ id, body }) => ({ url: `/projects/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
