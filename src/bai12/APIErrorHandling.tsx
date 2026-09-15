import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

type CustomError = {
  message: string;
  status?: number;
};

const APIErrorHandling = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWithError = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/invalid-url-endpoint"
      );

      if (!response.ok)
        throw {
          message: `Server connection error - status: ${response.status}`,
          status: response.status,
        } as CustomError;
      await response.json();
    } catch (error) {
      const err = error as CustomError;
      const errorMsg = err.message || "Connection error";

      Alert.alert("Error", errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Error Handling</Text>

      <Pressable
        style={styles.button}
        onPress={fetchWithError}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Error while calling API</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#F4F7F9",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#17324D",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#B42318",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});

export default APIErrorHandling;
