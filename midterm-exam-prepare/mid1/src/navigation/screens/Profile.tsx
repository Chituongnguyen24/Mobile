import { StaticScreenProps } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile(_props: Props) {
  const [name, setName] = useState('Nguyễn Lâm Chí Tường');
  const [studentId, setStudentId] = useState('22714591');
  const [className, setClassName] = useState('DHKTPM18BTT');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nhập họ và tên"
          placeholderTextColor="#98A2B3"
          style={styles.input}
        />

        <Text style={styles.label}>Mã số sinh viên</Text>
        <TextInput
          value={studentId}
          onChangeText={setStudentId}
          placeholder="Nhập mã số sinh viên"
          placeholderTextColor="#98A2B3"
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Lớp</Text>
        <TextInput
          value={className}
          onChangeText={setClassName}
          placeholder="Nhập tên lớp"
          placeholderTextColor="#98A2B3"
          style={styles.input}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F4F7FB',
  },
  card: {
    borderRadius: 18,
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  sectionTitle: {
    color: '#102A43',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    color: '#344054',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    color: '#102A43',
    fontSize: 15,
    paddingHorizontal: 14,
    marginBottom: 17,
  },
});
