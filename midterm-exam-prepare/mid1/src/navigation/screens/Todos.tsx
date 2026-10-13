import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
 
type Todo = { id: string; title: string; completed: boolean };
 
const API_URL = 'https://6ab279d75b9b60f39d34c755.mockapi.io/todos';
 
// Chuyển dữ liệu API về dạng Todo
const toTodo = (item: any): Todo => ({
  id: item.id,
  title: item.title || item.Description || 'Công việc chưa có tên',
  completed: item.isCompleted === true || item.isCompleted === 'true',
});
 
// Hàm gọi API dùng chung, lỗi HTTP sẽ tự throw
async function request(url: string, method = 'GET', body?: object) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
  return res.json();
}
 
export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
 
  // Bọc mọi thao tác: bật busy, bắt lỗi, tắt busy
  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError('');
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
    } finally {
      setBusy(false);
    }
  };
 
  const loadTodos = () =>
    run(async () => {
      const data = await request(API_URL);
      setTodos(data.map(toTodo));
    });
 
  useEffect(() => {
    loadTodos();
  }, []);
 
  const saveTodo = () => {
    const title = text.trim();
    if (!title) return;
 
    run(async () => {
      if (editingId) {
        await request(`${API_URL}/${editingId}`, 'PUT', { title, Description: title });
        setTodos((list) => list.map((t) => (t.id === editingId ? { ...t, title } : t)));
      } else {
        const created = await request(API_URL, 'POST', { title, Description: title, isCompleted: false });
        setTodos((list) => [toTodo(created), ...list]);
      }
      cancelEdit();
    });
  };
 
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setText(todo.title);
  };
 
  const cancelEdit = () => {
    setEditingId(null);
    setText('');
  };
 
  const deleteTodo = (id: string) =>
    run(async () => {
      await request(`${API_URL}/${id}`, 'DELETE');
      setTodos((list) => list.filter((t) => t.id !== id));
      if (editingId === id) cancelEdit();
    });
 
  const toggleTodo = (todo: Todo) =>
    run(async () => {
      await request(`${API_URL}/${todo.id}`, 'PUT', { isCompleted: !todo.completed });
      setTodos((list) => list.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));
    });
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
 
      <View style={styles.row}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={saveTodo}
          placeholder={editingId ? 'Sửa công việc' : 'Nhập công việc mới'}
          style={styles.input}
        />
        <Button title={editingId ? 'Lưu' : 'Thêm'} onPress={saveTodo} disabled={busy} />
        {editingId && <Button title="Hủy" onPress={cancelEdit} disabled={busy} />}
      </View>
 
      {busy && <ActivityIndicator color="#176B87" />}
      {error !== '' && (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title="Tải lại" onPress={loadTodos} />
        </View>
      )}
 
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có công việc</Text>}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Pressable onPress={() => toggleTodo(item)} disabled={busy}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>{item.title}</Text>
            </Pressable>
            <View style={styles.row}>
              <Button title="Sửa" onPress={() => startEdit(item)} disabled={busy} />
              <Button title="Xóa" onPress={() => deleteTodo(item.id)} disabled={busy} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB', padding: 24 },
  title: { color: '#102A43', fontSize: 26, fontWeight: '700', marginBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D0D5DD',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  todo: { backgroundColor: '#FFFFFF', borderRadius: 10, marginBottom: 10, padding: 16 },
  todoText: { color: '#344054', fontSize: 16, marginBottom: 8 },
  completed: { color: '#98A2B3', textDecorationLine: 'line-through' },
  empty: { color: '#98A2B3', textAlign: 'center', marginTop: 30 },
  error: { color: '#B42318', fontSize: 16 },
});