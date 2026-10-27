import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons as I } from '@expo/vector-icons';
import ProductCard, { Product } from './components/ProductCard';

const API = 'https://YOUR_ID.mockapi.io/products';
const row = { flexDirection: 'row', alignItems: 'center' } as const;

type CartItem = Product & { qty: number };

function Main() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch(API).then((r) => r.json()).then(setProducts).finally(() => setLoading(false));
  }, []);

  const add = useCallback((p: Product) =>
    setCart((c) =>
      c.some((i) => i.id === p.id)
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }]
    ), []);

  const change = (id: string, d: number) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const checkout = () => {
    Alert.alert('Thanh toán thành công', `Bạn đã thanh toán $${total}`);
    setCart([]);
    setShowCart(false);
  };

  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={{ ...row, justifyContent: 'space-between', padding: 12, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{showCart ? 'Giỏ hàng' : 'Product Store'}</Text>
        <TouchableOpacity onPress={() => setShowCart(!showCart)}>
          <I name={showCart ? 'close' : 'shopping-cart'} size={28} />
          {!showCart && count > 0 && (
            <Text style={{ position: 'absolute', top: -6, right: -8, minWidth: 18, textAlign: 'center', fontSize: 11, color: '#fff', backgroundColor: 'red', borderRadius: 9, overflow: 'hidden' }}>
              {count}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {showCart ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>Giỏ hàng trống</Text>}
            renderItem={({ item }) => (
              <View style={{ ...row, backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10 }}>
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ color: 'red' }}>${item.price * item.qty}</Text>
                </View>
                <TouchableOpacity onPress={() => change(item.id, -1)}><I name="remove-circle-outline" size={26} /></TouchableOpacity>
                <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                <TouchableOpacity onPress={() => change(item.id, 1)}><I name="add-circle-outline" size={26} /></TouchableOpacity>
              </View>
            )}
          />
          <View style={{ ...row, justifyContent: 'space-between', padding: 12, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tổng: ${total}</Text>
            <TouchableOpacity
              disabled={!cart.length}
              onPress={checkout}
              style={{ backgroundColor: cart.length ? '#007AFF' : '#ccc', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => <ProductCard product={item} onAdd={add} />}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return <SafeAreaProvider><Main /></SafeAreaProvider>;
}