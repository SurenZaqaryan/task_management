import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
