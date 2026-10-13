import { Text, View } from 'react-native';

function MenuPlaceholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{title}</Text>
    </View>
  );
}

export function Search() {
  return <MenuPlaceholder title="Search Screen" />;
}

export function Favorites() {
  return <MenuPlaceholder title="Favorites Screen" />;
}

export function Inbox() {
  return <MenuPlaceholder title="Inbox Screen" />;
}

export function Account() {
  return <MenuPlaceholder title="Account Screen" />;
}