import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Pressable, StyleSheet, View } from 'react-native';
const Header = () => {
    return (
        <View style={styles.header}>
           <View style={styles.logo}>
            <img src={require('../assets/logo.png')} alt="Logo" style={{ width: '100%', height: '100%' }} />
           </View>
           <View style={styles.leftheader}>
            <Pressable onPress={() => console.log('Menu pressed')}>
                <Feather name="search" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => console.log('Menu pressed')}>
                <FontAwesome5 name="shopping-cart" size={24} color="black" />
            </Pressable>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        padding: 16,
        backgroundColor: '#f8f8f8',
        width: '100%',
        height: 56,
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 50,
    },
    leftheader: {
        width: 100,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default Header;
