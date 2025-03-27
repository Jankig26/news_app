import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/newsSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { articles, loading, error, page } = useSelector((state) => state.news);

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch]);

  const loadMoreNews = () => {
    if (!loading) {
      dispatch(fetchNews(page + 1));
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading && page === 1 && <ActivityIndicator size="large" color="blue" />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.url}-${index}`} // ✅ Force unique keys
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={{ height: 200, width: "100%" }} />
            )}
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        ListFooterComponent={() =>
          loading && page > 1 ? <ActivityIndicator size="small" color="blue" /> : null
        }
        onEndReached={loadMoreNews}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default HomeScreen;
