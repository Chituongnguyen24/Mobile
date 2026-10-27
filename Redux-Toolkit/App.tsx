import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { store, useAppDispatch, useAppSelector } from './src/redux/store';
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  CartItem,
} from './src/redux/cartSlice';
import { PRODUCT_LIST, Product } from './src/data/products';

function ShoppingCartApp() {
  const dispatch = useAppDispatch();

  // [READ]: Lấy danh sách món trong giỏ từ Redux
  const cartItems = useAppSelector((state) => state.cart.items);

  // [READ]: Tính tổng số lượng & tổng tiền
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Tiêu đề ứng dụng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Shopping Cart Redux Toolkit</Text>
        <Text style={styles.headerSub}>Demo Slice CRUD: Danh sách sản phẩm ⇋ Giỏ hàng</Text>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* PHẦN 1: DANH SÁCH SẢN PHẨM CÓ SẴN (ĐỂ BẤM THÊM VÀO GIỎ) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🛍️ 1. Danh sách sản phẩm (Bấm để thêm)</Text>
          <View style={styles.productsGrid}>
            {PRODUCT_LIST.map((prod: Product) => {
              // Kiểm tra xem sản phẩm này đã có trong giỏ chưa
              const inCart = cartItems.find((item) => item.id === prod.id);

              return (
                <View key={prod.id} style={styles.productItem}>
                  <Text style={styles.productIcon}>{prod.icon}</Text>
                  <Text style={styles.productName} numberOfLines={1}>
                    {prod.name}
                  </Text>
                  <Text style={styles.productPrice}>
                    {prod.price.toLocaleString('vi-VN')} đ
                  </Text>

                  {/* [CREATE]: Gọi dispatch(addItem(...)) */}
                  <TouchableOpacity
                    style={styles.addCartBtn}
                    onPress={() =>
                      dispatch(
                        addItem({
                          id: prod.id,
                          name: prod.name,
                          price: prod.price,
                        })
                      )
                    }
                  >
                    <Text style={styles.addCartBtnText}>
                      {inCart ? `+ Thêm (${inCart.quantity})` : '+ Thêm vào giỏ'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* PHẦN 2: GIỎ HÀNG HIỆN TẠI (CRUD: READ, UPDATE, DELETE) */}
        <View style={styles.card}>
          <View style={styles.cartTitleRow}>
            <Text style={styles.sectionTitle}>
              🛒 2. Giỏ hàng của bạn ({totalQuantity} món)
            </Text>
            {cartItems.length > 0 && (
              // [DELETE ALL]: Xoá toàn bộ giỏ
              <TouchableOpacity
                style={styles.clearAllBtn}
                onPress={() => dispatch(clearCart())}
              >
                <Text style={styles.clearAllText}>Xoá hết</Text>
              </TouchableOpacity>
            )}
          </View>

          {cartItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Giỏ hàng đang trống!</Text>
              <Text style={styles.emptySub}>
                Hãy bấm "+ Thêm vào giỏ" ở danh sách sản phẩm bên trên.
              </Text>
            </View>
          ) : (
            cartItems.map((item: CartItem) => (
              <View key={item.id} style={styles.cartRow}>
                {/* Thông tin món trong giỏ */}
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    {item.price.toLocaleString('vi-VN')} đ × {item.quantity} ={' '}
                    <Text style={{ fontWeight: 'bold', color: '#059669' }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </Text>
                  </Text>
                </View>

                {/* [UPDATE]: Tăng / Giảm số lượng */}
                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => dispatch(increaseQuantity(item.id))}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* [DELETE]: Xoá 1 món khỏi giỏ */}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => dispatch(removeItem(item.id))}
                >
                  <Text style={styles.deleteBtnText}>Xoá</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* PHẦN 3: TỔNG KẾT THANH TOÁN (FOOTER) */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Tổng thanh toán:</Text>
          <Text style={styles.footerTotal}>
            {totalPrice.toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <View style={styles.footerBadge}>
          <Text style={styles.footerBadgeText}>
            Đã chọn: {totalQuantity} sản phẩm
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Bọc Provider Redux ở cấp cao nhất
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ShoppingCartApp />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  scrollArea: {
    flex: 1,
    padding: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  productItem: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  productIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: '#0284c7',
    fontWeight: '700',
    marginVertical: 4,
  },
  addCartBtn: {
    backgroundColor: '#0284c7',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 2,
  },
  addCartBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearAllBtn: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  clearAllText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyBox: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
  },
  emptySub: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  cartItemPrice: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
    color: '#0f172a',
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteBtnText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  footerTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#059669',
  },
  footerBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  footerBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
});
