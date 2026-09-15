import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const UserProfileDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data as User);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#176b9a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile Detail</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name: {user?.name}</Text>
        <Text style={styles.label}>Email: {user?.email}</Text>
        <Text style={styles.label}>Phone: {user?.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4F7F9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#17324D",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8E0E5",
    gap: 8,
  },
  label: { fontSize: 16, color: "#202A33" },
});

export default UserProfileDetail;
