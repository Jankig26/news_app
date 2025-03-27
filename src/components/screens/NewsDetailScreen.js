import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function NewsDetailScreen({ route }) {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  image: { width: "100%", height: 250, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  content: { fontSize: 16, lineHeight: 24 },
});
