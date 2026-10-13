import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import logo from '../../../assets/logo.png';

const users = [
  {
    email: 'user1@example.com',
    password: 'password1'
  },
  {
    email: 'user2@example.com',
    password: 'password2'
  },
  {
    email: 'user3@example.com',
    password: 'password3'
  },
  {
    email: 'user4@example.com',
    password: 'password4'
  },
  {
     email: 'user5@example.com',
    password: 'password5'
  }
];
export function Home() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    const user = users.find(
      (account) => account.email === email.trim() && account.password === password,
    );

    if (user) {
      navigation.navigate('HomeTabs');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 150, height: 150 }} />
      <Text style={styles.title}>Hello Again!</Text>
      <Text style={styles.description}>Log into your account </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable>
        <Text style={styles.forgotpassword}>Forgot password?</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </Pressable>
        <Text>Or</Text>
      <View style={styles.otherOptions}>
        <Pressable style={{backgroundColor: '#fff', borderColor: '#c71212', borderWidth: 1, padding: 10, borderRadius: 10}}>
          <Text style={{color: '#852626', textAlign: 'center', fontWeight: 'bold'}}>G</Text>
        </Pressable>
        <Pressable style={{backgroundColor: '#fff',borderColor: '#151cdf', borderWidth: 1, padding: 10, borderRadius: 10}}>
          <Text style={{color: '#124fde', textAlign: 'center', fontWeight: 'bold'}}>f</Text>
        </Pressable>
        <Pressable style={{backgroundColor: '#fff',borderColor: '#ac9797', borderWidth: 1, padding: 10, borderRadius: 10}}>
          <Text style={{color: '#676464', textAlign: 'center', fontWeight: 'bold'}}>A</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  forgotpassword: {
    color: '#4183e7',
    textAlign: 'right',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#8b8484',
  },
  input: {
    borderWidth: 1,
    borderColor: '#322c2c',
    borderRadius: 10,
    padding: 10,
    width: '80%',
  },
  btn: {
    backgroundColor: '#4183e7',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  otherOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
