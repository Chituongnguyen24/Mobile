import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const BookDetail = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/BookCover.jpg')} style={styles.image} resizeMode="cover" />
            </View>
            <ScrollView style={styles.bookDetail}>
                <Text style={styles.bookTitle}> Tên Sách</Text>
                 <Text style={styles.bookPrice}> Giá Sách</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: '#d3d3d3',
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 0.75,
        alignSelf: 'center',
    },
    bookDetail: {
        width: '100%',
        height: '50%',
        backgroundColor: '#f8f8f8',
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    bookPrice: {
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: 10,
    }
})

export default BookDetail;
