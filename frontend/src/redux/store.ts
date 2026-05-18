import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './features/blogApi';
import { projectApi } from './features/projectApi';
import { messageApi } from './features/messageApi';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(projectApi.middleware)
      .concat(messageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
