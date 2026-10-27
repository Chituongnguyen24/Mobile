import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Định nghĩa kiểu dữ liệu cho một món trong giỏ hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// 2. State của giỏ hàng
interface CartState {
  items: CartItem[];
}

// 3. Khởi tạo giỏ hàng rỗng (hoặc 1 món mẫu)
const initialState: CartState = {
  items: [],
};

// 4. Tạo Slice với đầy đủ các thao tác CRUD
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ➕ [CREATE]: Thêm sản phẩm từ danh mục vào giỏ
    addItem: (
      state,
      action: PayloadAction<{ id: string; name: string; price: number }>
    ) => {
      const { id, name, price } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity += 1; // Nếu đã có thì tăng số lượng lên 1
      } else {
        state.items.push({ id, name, price, quantity: 1 }); // Thêm mới
      }
    },

    // ⬆️ [UPDATE]: Tăng số lượng (+1)
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // ⬇️ [UPDATE]: Giảm số lượng (-1), nếu bằng 1 mà giảm tiếp thì xoá
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    // 🗑️ [DELETE]: Xoá hẳn 1 món khỏi giỏ
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // 🧹 [DELETE ALL]: Dọn sạch toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
