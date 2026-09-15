import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
};

const PullToRefreshState = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchProducts = () => {
    fetch("https://dummyjson.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(false);
    fetchProducts();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#176B9A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pull to Refresh State</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}$</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4F7F9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
});

export default PullToRefreshState;
