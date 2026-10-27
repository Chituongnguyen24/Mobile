export interface Product {
  id: string;
  name: string;
  price: number;
  icon: string;
}

// Danh sách sản phẩm có sẵn trong cửa hàng để người dùng bấm thêm vào giỏ
export const PRODUCT_LIST: Product[] = [
  { id: 'p1', name: 'Áo thun phong cách', price: 150000, icon: '👕' },
  { id: 'p2', name: 'Quần jeans thời trang', price: 350000, icon: '👖' },
  { id: 'p3', name: 'Giày sneaker trắng', price: 550000, icon: '👟' },
  { id: 'p4', name: 'Tai nghe Bluetooth', price: 420000, icon: '🎧' },
  { id: 'p5', name: 'Đồng hồ thông minh', price: 890000, icon: '⌚' },
  { id: 'p6', name: 'Balo chống nước', price: 280000, icon: '🎒' },
];
