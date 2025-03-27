import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, clearNews } from "../redux/newsSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchNews()); // Load news on screen load
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(clearNews()); // 🔥 Clears old news first
    dispatch(fetchNews())
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Indian News 🇮🇳</Text>
      {loading && !refreshing && <ActivityIndicator size="large" color="blue" />}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            {item.urlToImage ? (
              <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
            ) : (
              <Text style={styles.noImageText}>No Image Available</Text>
            )}
            <Text style={styles.newsTitle}>{item.title}</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  newsItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd", marginBottom: 10 },
  newsImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  newsTitle: { fontSize: 18, fontWeight: "500" },
  error: { color: "red", fontSize: 16, textAlign: "center", marginTop: 20 },
  noImageText: { fontSize: 14, fontStyle: "italic", color: "gray", textAlign: "center" },
});
