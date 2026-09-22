import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';

const products = [
  {
    color: 'black',
    swatch: '#202124',
    image: require('../../assets/products/vs-black.png'),
  },
  {
    color: 'blue',
    swatch: '#1674b9',
    image: require('../../assets/products/vs-blue.png'),
  },
  {
    color: 'red',
    swatch: '#e53935',
    image: require('../../assets/products/vs-red.png'),
  },
  {
    color: 'white',
    swatch: '#ffffff',
    image: require('../../assets/products/vs-white.png'),
  },
];

export default function TabOneScreen() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedProduct = products[selectedIndex];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={selectedProduct.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>★ ★ ★ ★ ★</Text>
            <Text style={styles.reviewText}>(Xem 828 đánh giá)</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>1.790.000 đ</Text>
            <Text style={styles.oldPrice}>1.790.000 đ</Text>
          </View>

          <View style={styles.refundRow}>
            <Text style={styles.refundText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
            <View style={styles.helpIcon}>
              <Text style={styles.helpText}>?</Text>
            </View>
          </View>

          <Text style={styles.colorLabel}>Chọn màu</Text>
          <View style={styles.colorOptions}>
            {products.map((product, index) => (
              <Pressable
                key={product.color}
                accessibilityLabel={`Chọn màu ${product.color}`}
                onPress={() => setSelectedIndex(index)}
                style={[
                  styles.colorOption,
                  { backgroundColor: product.swatch },
                  selectedIndex === index && styles.selectedColorOption,
                ]}
              >
                {selectedIndex === index && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.buyButton}>
            <Text style={styles.buyButtonText}>CHỌN MUA</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  details: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    color: '#111',
    fontSize: 16,
    lineHeight: 21,
    marginTop: 2,
  },

  imageContainer: {
    width: '100%',
    height: 335,
    backgroundColor: '#fff',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  price: {
    color: '#111',
    fontSize: 17,
    fontWeight: 'bold',
  },

  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 7,
  },

  stars: {
    color: '#f3d000',
    fontSize: 21,
    letterSpacing: 1,
  },

  reviewText: {
    color: '#111',
    fontSize: 14,
    marginLeft: 24,
  },

  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },

  oldPrice: {
    color: '#777',
    fontSize: 14,
    marginLeft: 38,
    textDecorationLine: 'line-through',
  },

  refundRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 13,
  },

  refundText: {
    color: '#e00000',
    fontSize: 11,
    fontWeight: 'bold',
  },

  helpIcon: {
    alignItems: 'center',
    borderColor: '#555',
    borderRadius: 10,
    borderWidth: 2,
    height: 19,
    justifyContent: 'center',
    marginLeft: 10,
    width: 19,
  },

  helpText: {
    color: '#333',
    fontSize: 13,
    fontWeight: 'bold',
  },

  colorLabel: {
    color: '#111',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 18,
  },

  colorOptions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 11,
  },

  colorOption: {
    alignItems: 'center',
    borderColor: '#d0d0d0',
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    width: 30,
    justifyContent: 'center',
  },

  selectedColorOption: {
    borderColor: '#111',
    borderWidth: 3,
  },

  checkmark: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  buyButton: {
    alignItems: 'center',
    backgroundColor: '#f20d0d',
    borderRadius: 9,
    height: 41,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 44,
  },

  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});