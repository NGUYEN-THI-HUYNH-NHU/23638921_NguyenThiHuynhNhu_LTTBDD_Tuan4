import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductResponse = {
  products: Product[];
};

const ProductSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = (searchKeyword: string, limit: number) => {
    setLoading(true);
    fetch(
      `https://dummyjson.com/products/search?q=${searchKeyword}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data: ProductResponse) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Search</Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={(text) => {
          setKeyword(text);
          fetchProducts(text, 10);
        }}
        placeholder="Enter product name"
      />

      {loading ? (
        <ActivityIndicator
          size="small"
          color="#176b9a"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No product found</Text>
          }
        />
      )}
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
  itemTitle: { fontSize: 15, fontWeight: "600", color: "#202A33" },
  itemPrice: { fontSize: 14, color: "#168A8A", marginTop: 4 },
  empty: { textAlign: "center", color: "#667784", marginTop: 20 },
});

export default ProductSearch;
