import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const API = 'https://dummyjson.com/products';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const getProducts = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const saveProduct = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const productData = {
      title: name,
      price: Number(price),
    };

    if (editId === null) {
      fetch(`API/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
        .then(res => res.json())
        .then(data => {
          setProducts([data, ...products]);
          clearForm();
        })
        .catch(error => console.log(error));
    } else {
      fetch(`API/editId`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
        .then(res => res.json())
        .then(data => {
          setProducts(products.map(item => item.id === editId ? { ...item, ...data } : item));
          clearForm();
        })
        .catch(error => console.log(error));
    }
  };

  const editProduct = (item: Product) => {
    setName(item.title);
    setPrice(String(item.price));
    setEditId(item.id);
  };

  const clearForm = () => {
    setName('');
    setPrice('');
    setEditId(null);
  };

  const deleteProduct = (id: number) => {
    fetch(`API/id`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setProducts(products.filter(item => item.id !== id));
        if (editId === id) {
          clearForm();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Management</Text>

      <TextInput
        style={styles.input}
        placeholder="Product name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProduct}>
        <Text style={styles.buttonText}>
          {editId === null ? 'Add Product' : 'Update Product'}
        </Text>
      </TouchableOpacity>

      {editId !== null && (
        <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      )}

      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => editProduct(item)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  saveButton: { backgroundColor: 'blue', padding: 12, borderRadius: 8, alignItems: 'center' },
  cancelButton: { backgroundColor: 'gray', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  list: { marginTop: 15 },
  card: { flexDirection: 'row', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10 },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { marginTop: 5, fontSize: 15 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  editButton: { backgroundColor: 'orange', padding: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: 'red', padding: 8, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
