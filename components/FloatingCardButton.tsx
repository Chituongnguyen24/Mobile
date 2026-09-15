import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FloatingCardButton() {
  return (
    <Pressable
      style={styles.fab}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>4</Text>
      </View>
      <Text style={styles.badgeText}>Giỏ Hàng</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#6181F6',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#D44040',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding:10
  },
});