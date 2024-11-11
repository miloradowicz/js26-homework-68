import { modalReducer } from '@/components/Modal/modalSlice';
import { todoReducer } from '@/containers/Todo/todoSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
