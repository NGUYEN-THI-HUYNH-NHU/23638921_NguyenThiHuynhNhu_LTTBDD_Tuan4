import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useState } from "react";

const filterByName = <T extends { name: string }>(
  items: T[],
  keyword: string
): T[] =>
  items.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

type Product = {
  id: string;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: "p1", name: "Điện thoại thông minh", price: 8500000 },
  { id: "p2", name: "Laptop Văn Phòng", price: 16200000 },
  { id: "p3", name: "Tai nghe Bluetooth", price: 1250000 },
];

const FilteredListGeneric = () => {
  const [keyword, setKeyword] = useState<string>("");

  const filteredProducts = filterByName(products, keyword);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtered List Generic</Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Enter name"
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Not found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4F7F9" },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#17324D",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D8E0E5",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  item: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D8E0E5",
  },
  itemText: { fontSize: 15, color: "#202A33" },
  empty: { textAlign: "center", color: "#667784", marginTop: 20 },
});

export default FilteredListGeneric;
