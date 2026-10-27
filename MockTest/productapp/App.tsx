import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ProductCard, { Product } from './components/ProductCard';

const API = 'https://6abc8ed75121d616d90ba8cf.mockapi.io/products';

type Form = Omit<Product, 'id'>;

const EMPTY: Form = {
  title: '',
  category: '',
  price: 0,
  rating: 0,
  image: '',
  inStock: 0,
  brand: '',
  size: 0,
};

const NUM_FIELDS = ['price', 'rating', 'inStock', 'size'];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [layout] = useState<'row' | 'tile'>('row');
  const [search, setSearch] = useState('');
  const [selCat, setSelCat] = useState<string | null>(null);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  // Lấy danh sách danh mục
  const cats = useMemo(
    () => [...new Set(products.map(p => p.category))].sort(),
    [products]
  );

  // Tìm kiếm và lọc sản phẩm
  const filtered = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        p =>
          p.title.toLowerCase().includes(keyword) ||
          p.category.toLowerCase().includes(keyword) ||
          p.brand.toLowerCase().includes(keyword)
      );
    }

    if (selCat) {
      result = result.filter(p => p.category === selCat);
    }

    return result;
  }, [products, search, selCat]);

  // Nhóm dữ liệu cho SectionList
  const sections = useMemo(() => {
    const categories = [...new Set(filtered.map(p => p.category))];

    return categories.map(category => ({
      title: category || 'Khác',
      data: filtered.filter(p => p.category === category),
    }));
  }, [filtered]);

  // GET: Tải sản phẩm
  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API);

      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu');
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Mở modal thêm hoặc sửa
  const openModal = (p?: Product) => {
    setEditing(p ?? null);

    setForm(
      p
        ? {
            title: p.title,
            category: p.category,
            price: p.price,
            rating: p.rating,
            image: p.image,
            inStock: p.inStock,
            brand: p.brand,
            size: p.size,
          }
        : { ...EMPTY }
    );

    setModal(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModal(false);
    setEditing(null);
    setForm({ ...EMPTY });
  };

  // POST: Thêm sản phẩm
  // PUT: Cập nhật sản phẩm
  const submit = async () => {
    if (!form.title.trim()) {
      Alert.alert('Lỗi', 'Nhập tên sản phẩm');
      return;
    }

    try {
      setSaving(true);

      const url = editing ? `${API}/${editing.id}` : API;

      const response = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Không thể lưu sản phẩm');
      }

      const data: Product = await response.json();

      setProducts(prev =>
        editing
          ? prev.map(p => (p.id === data.id ? data : p))
          : [...prev, data]
      );

      closeModal();
    } catch {
      Alert.alert('Lỗi', 'Không thể lưu sản phẩm');
    } finally {
      setSaving(false);
    }
  };

  // DELETE: Xóa sản phẩm
  const del = (id: string) => {
    const product = products.find(p => p.id === id);

    Alert.alert('Xác nhận', `Xóa "${product?.title}"?`, [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`${API}/${id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('Không thể xóa sản phẩm');
            }

            setProducts(prev => prev.filter(p => p.id !== id));
          } catch {
            Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
          }
        },
      },
    ]);
  };

  // Cập nhật dữ liệu form
  const setField = (key: keyof Form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: NUM_FIELDS.includes(key) ? Number(value) || 0 : value,
    }));
  };

  // Component nhập liệu
  const field = (label: string, key: keyof Form, num?: boolean) => (
    <View key={key}>
      <Text style={S.label}>{label}</Text>

      <TextInput
        style={S.input}
        value={String(form[key])}
        onChangeText={value => setField(key, value)}
        keyboardType={num ? 'numeric' : 'default'}
      />
    </View>
  );

  // Loading
  if (loading) {
    return (
      <SafeAreaView style={S.center}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={S.loadTxt}>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  // Error
  if (error) {
    return (
      <SafeAreaView style={S.center}>
        <MaterialIcons name="error" size={48} color="#FF3B30" />

        <Text style={S.errTxt}>{error}</Text>

        <Text style={S.retry} onPress={load}>
          Thử lại
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={S.cont}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={S.hdr}>
        <MaterialIcons name="movie" size={24} color="#333" />
        <Text style={S.hdrTxt}>MovieApp</Text>
      </View>

      {/* Search */}
      <View style={S.search}>
        <MaterialIcons
          name="search"
          size={20}
          color="#999"
          style={{ marginRight: 8 }}
        />

        <TextInput
          style={S.searchIn}
          placeholder="Tìm kiếm..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <MaterialIcons name="cancel" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter category */}
      <View style={S.filterWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.filterScr}
        >
          <TouchableOpacity
            style={[S.chip, !selCat && S.chipOn]}
            onPress={() => setSelCat(null)}
          >
            <Text style={[S.chipTxt, !selCat && S.chipTxtOn]}>
              Tất cả
            </Text>
          </TouchableOpacity>

          {cats.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                S.chip,
                selCat === category && S.chipOn,
              ]}
              onPress={() =>
                setSelCat(selCat === category ? null : category)
              }
            >
              <Text
                style={[
                  S.chipTxt,
                  selCat === category && S.chipTxtOn,
                ]}
              >
                {category || 'Khác'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* SectionList */}
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => (
          <Text style={S.sectionTitle}>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            layout={layout}
            onSelect={id => {
              const p = products.find(x => x.id === id);

              if (p) {
                Alert.alert(
                  'Chi tiết',
                  `${p.title}\nGiá: $${p.price}\nBrand: ${p.brand}`
                );
              }
            }}
            onEdit={openModal}
            onDelete={del}
          />
        )}
        contentContainerStyle={S.list}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <View style={S.empty}>
            <MaterialIcons
              name="inventory-2"
              size={48}
              color="#999"
            />

            <Text style={S.emptyTxt}>
              Không tìm thấy sản phẩm
            </Text>
          </View>
        }
      />

      {/* Button add */}
      <TouchableOpacity
        style={S.fab}
        onPress={() => openModal()}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal add/edit */}
      <Modal
        visible={modal}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={S.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={S.modal}>
            <View style={S.modalHdr}>
              <Text style={S.modalTitle}>
                {editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
              </Text>

              <TouchableOpacity onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {field('Tên *', 'title')}
              {field('Danh mục', 'category')}
              {field('Thương hiệu', 'brand')}
              {field('Giá', 'price', true)}
              {field('Đánh giá', 'rating', true)}
              {field('Tồn kho', 'inStock', true)}
              {field('Size', 'size', true)}
              {field('Link ảnh', 'image')}
            </ScrollView>

            <TouchableOpacity
              style={[S.submitBtn, saving && { opacity: 0.6 }]}
              onPress={submit}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={S.submitTxt}>
                  {editing ? 'Cập nhật' : 'Tạo mới'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  hdr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },

  hdrTxt: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },

  searchIn: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  filterWrap: {
    marginTop: 10,
    marginBottom: 4,
  },

  filterScr: {
    paddingHorizontal: 12,
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  chipOn: {
    backgroundColor: '#333',
  },

  chipTxt: {
    fontSize: 13,
    color: '#666',
  },

  chipTxtOn: {
    color: '#fff',
    fontWeight: 'bold',
  },

  list: {
    padding: 12,
    paddingBottom: 80,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },

  loadTxt: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  errTxt: {
    fontSize: 16,
    color: '#FF3B30',
    marginVertical: 12,
  },

  retry: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },

  empty: {
    alignItems: 'center',
    marginTop: 40,
  },

  emptyTxt: {
    marginTop: 8,
    fontSize: 16,
    color: '#999',
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    maxHeight: '85%',
  },

  modalHdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },

  submitBtn: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },

  submitTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});