import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

const BookCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FontAwesome name="file-image-o" size={28} color="#555" />
        <Text style={styles.imageLabel}>Ảnh bìa</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.infoBox, styles.titleBox]}>
          <Text style={styles.infoText}>Tên sách</Text>
        </View>
        <View style={[styles.infoBox, styles.authorBox]}>
          <Text style={styles.infoText}>Tác giả</Text>
        </View>
        <View style={[styles.infoBox, styles.priceBox]}>
          <Text style={styles.infoText}>Giá</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    minHeight: 180,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageContainer: {
    width: '40%',
    aspectRatio: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
  imageLabel: {
    marginTop: 10,
    fontWeight: '600',
    color: '#222',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 18,
  },
  infoBox: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9bb5f4',
  },
  titleBox: {
    width: '100%',
  },
  authorBox: {
    width: '82%',
  },
  priceBox: {
    width: '42%',
    borderColor: '#83bf72',
  },
  infoText: {
    fontWeight: '600',
    color: '#222',
  },
});
export default BookCard