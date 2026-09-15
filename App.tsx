import { ScrollView, StyleSheet, View } from 'react-native';
import BookCard from './components/BookCard';
import CategoryChips from './components/CategoryChips';
import FloatingCardButton from './components/FloatingCardButton';
import Header from './components/Header';
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.bookGrid}
      >
        <CategoryChips />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </ScrollView>
      <FloatingCardButton />
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
  scrollView: {
    width: '100%',
  },
  bookGrid: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
});
