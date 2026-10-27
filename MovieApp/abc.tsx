import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    require('./assets/black.png'),
    require('./assets/white.png'),
    require('./assets/red.png'),
    require('./assets/blue.png'),
  ];

  const colors = [
    'black',
    'white',
    'red',
    'blue',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product</Text>

      <Image
        source={images[selectedImage]}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.text}>Choose Color</Text>

      <View style={styles.colors}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(index)}
            style={[
              styles.colorButton,
              { backgroundColor: color },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  colors: {
    flexDirection: 'row',
    gap: 15,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#999',
  },
});
