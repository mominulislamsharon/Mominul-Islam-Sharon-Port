import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) headers.set('Authorization', `Bearer ${session.accessToken}`);
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => '/messages',
      transformResponse: (res: { data: Message[] }) => res.data,
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation<void, { name: string; email: string; message: string }>({
      query: (body) => ({ url: '/messages', method: 'POST', body }),
    }),
    markAsRead: builder.mutation<void, string>({
      query: (id) => ({ url: `/messages/${id}/read`, method: 'PATCH' }),
      invalidatesTags: ['Message'],
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({ url: `/messages/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} = messageApi;
