import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Product = {
  id: string; title: string; category: string; price: number;
  rating: number; image: string; inStock: number; brand: string; size: number;
};

type Props = {
  product: Product; layout?: 'row' | 'tile';
  onSelect: (id: string) => void; onEdit: (p: Product) => void; onDelete: (id: string) => void;
};

const S = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  tile: { width: '48%', backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, overflow: 'hidden' },
  imgRow: { width: 80, height: 80, borderRadius: 6 },
  imgTile: { width: '100%', aspectRatio: 1 },
  infoRow: { flex: 1, marginLeft: 10 },
  infoTile: { padding: 8 },
  badge: { position: 'absolute', top: 6, left: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, gap: 3, overflow: 'hidden' },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontWeight: 'bold', fontSize: 15, flex: 1 },
  acts: { flexDirection: 'row', gap: 10, marginLeft: 8 },
  gray: { color: 'gray' },
  price: { color: 'red', fontWeight: 'bold' },
  ratRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  stkRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  inStk: { color: '#34C759', fontSize: 13 },
  outStk: { color: '#FF3B30', fontSize: 13 },
});

const ProductCard = ({ product: p, layout = 'row', onSelect, onEdit, onDelete }: Props) => {
  const t = layout === 'tile';
  return (
    <TouchableOpacity style={t ? S.tile : S.row} onPress={() => onSelect(p.id)}>
      <View>
        <Image source={{ uri: p.image }} style={t ? S.imgTile : S.imgRow} />
        {t && <View style={S.badge}><MaterialIcons name="star" size={12} color="#FFD700" /><Text style={S.badgeTxt}>{p.rating.toFixed(1)}</Text></View>}
      </View>
      <View style={t ? S.infoTile : S.infoRow}>
        <View style={S.titleRow}>
          <Text style={S.title} numberOfLines={t ? 1 : undefined}>{p.title}</Text>
          <View style={S.acts}>
            <TouchableOpacity onPress={() => onEdit(p)} hitSlop={8}><MaterialIcons name="edit" size={18} color="#007AFF" /></TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(p.id)} hitSlop={8}><MaterialIcons name="delete" size={18} color="#FF3B30" /></TouchableOpacity>
          </View>
        </View>
        {!t && <Text style={S.gray}>{p.category}</Text>}
        {!t && <View style={S.ratRow}><MaterialIcons name="star" size={14} color="#FFD700" /><Text>{p.rating.toFixed(1)}</Text></View>}
        <Text style={S.price}>${p.price}</Text>
        <View style={S.stkRow}>
          <MaterialIcons name={p.inStock > 0 ? 'check-circle' : 'cancel'} size={16} color={p.inStock > 0 ? '#34C759' : '#FF3B30'} />
          <Text style={p.inStock > 0 ? S.inStk : S.outStk}>{p.inStock > 0 ? `Còn hàng (${p.inStock})` : 'Hết hàng'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductCard);
