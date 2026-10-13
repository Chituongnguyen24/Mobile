import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Category = 'Smart Phone' | 'Ipad' | 'MacBook';
type Type = 'Best Sales' | 'Best Matched' | 'Popular';

const products: { category: Category; type: Type; name: string; price: string }[] = [
  ...(['Best Sales', 'Best Matched', 'Popular'] as Type[]).flatMap((type) => [
    { category: 'Smart Phone' as Category, type, name: 'Smartphone', price: '$899' },
    { category: 'Smart Phone' as Category, type, name: 'Smartphone Pro', price: '$999' },
    { category: 'Ipad' as Category, type, name: 'iPad', price: '$789' },
    { category: 'Ipad' as Category, type, name: 'iPad Air', price: '$899' },
    { category: 'MacBook' as Category, type, name: 'MacBook', price: '$1299' },
    { category: 'MacBook' as Category, type, name: 'MacBook Pro', price: '$1599' },
  ]),
];

export function Screen02() {
  const navigation = useNavigation();
  const [category, setCategory] = useState<Category>('Smart Phone');
  const [type, setType] = useState<Type>('Best Sales');
  const [showAll, setShowAll] = useState(false);
  const list = products.filter((item) => item.category === category && item.type === type);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={showAll ? list : list.slice(0, 4)}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Electronics</Text>
          <Text style={styles.heading}>Categories</Text>
          <View style={styles.row}>
            {(['Smart Phone', 'Ipad', 'MacBook'] as Category[]).map((item) => (
              <Pressable
                key={item}
                style={[styles.category, category === item && styles.selected]}
                onPress={() => {
                  setCategory(item);
                  setType('Best Sales');
                  setShowAll(false);
                }}
              >
                <Text>{item}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.row}>
            {(['Best Sales', 'Best Matched', 'Popular'] as Type[]).map((item) => (
              <Pressable
                key={item}
                style={[styles.filter, type === item && styles.selected]}
                onPress={() => {
                  setType(item);
                  setShowAll(false);
                }}
              >
                <Text>{item}</Text>
              </Pressable>
            ))}
          </View>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.product}>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      )}
      ListFooterComponent={
        <>
          {!showAll && list.length > 4 && (
            <Pressable style={styles.seeAll} onPress={() => setShowAll(true)}>
              <Text>See all</Text>
            </Pressable>
          )}
          <Pressable
            style={styles.logout}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
          >
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </Pressable>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  category: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  filter: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  selected: {
    backgroundColor: '#d9c5ff',
    borderBottomColor: '#7435d1',
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  seeAll: {
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#eee',
  },
  logout: {
    alignItems: 'center',
    padding: 14,
    marginTop: 16,
    backgroundColor: '#d9534f',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },
});