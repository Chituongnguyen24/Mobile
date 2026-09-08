import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BookCard from './components/BookCard';
import Header from './components/Header';
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <BookCard />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
});
