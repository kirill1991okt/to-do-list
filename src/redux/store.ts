import { configureStore } from '@reduxjs/toolkit';
import todo from './slices/todoReducer';
import sort from './slices/sortReducer';

export const store = configureStore({
  reducer: {
    todo,
    sort,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
