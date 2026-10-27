import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons as I } from '@expo/vector-icons';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
}

const row = { flexDirection: 'row', alignItems: 'center' } as const;

const ProductCard = ({ product: p, onAdd }: ProductCardProps) => (
  <View style={{ ...row, backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10 }}>
    <Image source={{ uri: p.image }} style={{ width: 80, height: 80 }} />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{p.title}</Text>
      <Text>{p.category}</Text>
      <View style={row}>
        <I name="star" size={16} color="#FFB300" />
        <Text> {p.rating.toFixed(1)}</Text>
      </View>
      <Text style={{ color: 'red' }}>${p.price}</Text>
      <Text>{p.inStock ? 'Còn hàng' : 'Hết hàng'}</Text>
    </View>
    <TouchableOpacity disabled={!p.inStock} onPress={() => onAdd(p)}>
      <I name="add-shopping-cart" size={30} color={p.inStock ? '#007AFF' : '#ccc'} />
    </TouchableOpacity>
  </View>
);

export default React.memo(ProductCard);