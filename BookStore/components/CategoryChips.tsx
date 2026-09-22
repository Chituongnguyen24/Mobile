import { Pressable, StyleSheet, Text, View } from 'react-native';

const CategoryChips = () => {
    return (
        <View style={[styles.container, styles.CategoryGrid]}>
            <Pressable style={styles.chip}>
                <Text>Văn học</Text>
            </Pressable>
             <Pressable style={styles.chip}>
                <Text>Kinh Tế</Text>
            </Pressable>
             <Pressable style={styles.chip}>
                <Text>Thiếu nhi</Text>
            </Pressable>
             <Pressable style={styles.chip}>
                <Text>Truyện Tranh</Text>
            </Pressable>
             <Pressable style={styles.chip}>
                <Text>Ngoại ngữ</Text>
            </Pressable>
             <Pressable style={styles.chip}>
                <Text>Lịch sử</Text>
            </Pressable>
              <Pressable style={styles.chip}>
                <Text>Địa lý</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        width: '100%',
        height: 100,
    },
    CategoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 16,
    },
})

export default CategoryChips;
