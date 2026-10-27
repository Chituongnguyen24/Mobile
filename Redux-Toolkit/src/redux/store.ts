import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartReducer from './cartSlice';

// Khởi tạo Redux Store và đăng ký cartReducer
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Kiểu dữ liệu RootState và AppDispatch dùng cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks typed để dùng trong các màn hình (thay cho useDispatch và useSelector thường)
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
