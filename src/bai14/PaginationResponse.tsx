import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

type ApiResponse<T> = {
  data: T[];
  total: number;
  page: number;
  hasMore: boolean;
};

type Product = {
  id: number;
  title: string;
  price: number;
};

const PaginationResponse = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProducts = async (targetPage: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=5&skip=${(targetPage - 1) * 5}`
      );
      const json = await res.json();

      const response: ApiResponse<Product> = {
        data: json.products,
        total: json.total,
        page: targetPage,
        hasMore: targetPage * 5 < json.total,
      };

      setProducts((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(targetPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagination Response</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}$</Text>
          </View>
        )}
        ListFooterComponent={
          hasMore ? (
            <Pressable
              style={styles.button}
              onPress={() => fetchProducts(page + 1)}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Load more</Text>
              )}
            </Pressable>
          ) : (
            <Text style={styles.endText}>All data has been loaded</Text>
          )
        }
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
  item: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D8E0E5",
  },
  itemText: { fontSize: 15, fontWeight: "600", color: "#202A33" },
  itemPrice: { fontSize: 14, color: "#168A8A", marginTop: 4 },
  button: {
    backgroundColor: "#176B9A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  endText: { textAlign: "center", color: "#667784", marginVertical: 12 },
});

export default PaginationResponse;
