# 🛒 Học Redux Toolkit Slice CRUD Cực Dễ

Dự án mẫu **Shopping Cart** rút gọn, trực quan và dễ học nhất bằng **React Native (Expo) + TypeScript + Redux Toolkit**.

---

## 🎯 Cấu trúc dự án:

1. **`src/data/products.ts`**: Danh sách sản phẩm mẫu có sẵn trong cửa hàng (Áo thun, Quần jeans, Giày, Tai nghe...).
2. **`src/redux/cartSlice.ts`**: Slice quản lý giỏ hàng với đầy đủ 4 thao tác CRUD.
3. **`src/redux/store.ts`**: Cấu hình Redux Store (`configureStore`).
4. **`App.tsx`**: Giao diện gồm 2 phần:
   - **Phần 1**: Danh sách sản phẩm (Bấm nút **"+ Thêm vào giỏ"** để thêm món).
   - **Phần 2**: Giỏ hàng (Nút **`[-]`**, **`[+]`** để chỉnh số lượng, nút **`[Xoá]`** để xoá món, nút **`[Xoá hết]`** để dọn sạch).
   - **Thanh tổng kết**: Hiển thị tổng số lượng món và tổng tiền thanh toán.

---

## 💡 Luồng hoạt động CRUD:

| Thao tác CRUD | Nơi gọi trong App | Action trong cartSlice | Kết quả |
| :--- | :--- | :--- | :--- |
| **CREATE** | Bấm nút **"+ Thêm vào giỏ"** ở danh sách | `dispatch(addItem(product))` | Thêm sản phẩm vào giỏ hoặc tăng số lượng nếu đã có |
| **READ** | Màn hình đọc state | `useAppSelector(state => state.cart.items)` | Render danh sách giỏ hàng và tính tổng tiền |
| **UPDATE (+)** | Bấm nút **`[+]`** | `dispatch(increaseQuantity(id))` | Số lượng món tăng thêm 1 |
| **UPDATE (-)** | Bấm nút **`[-]`** | `dispatch(decreaseQuantity(id))` | Số lượng giảm 1 (về 0 tự xoá) |
| **DELETE (Xoá món)**| Bấm nút **`[Xoá]`** | `dispatch(removeItem(id))` | Xoá món khỏi giỏ hàng |
| **DELETE (Xoá hết)**| Bấm nút **`[Xoá hết]`** | `dispatch(clearCart())` | Giỏ hàng về rỗng |

---

## 🚀 Cách chạy thử app:

```bash
npx expo start
```
- Nhấn phím **`w`** để mở trên trình duyệt Web.
- Quét mã QR bằng app **Expo Go** trên điện thoại.
