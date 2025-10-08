import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/feed/ArticleCard";
import { fetchFeedByCategory } from "@/queries/articles";

const categories = [
  { name: "All" },
  { name: "Technology" },
  { name: "Health" },
  { name: "Business" },
  { name: "Entertainment" },
  { name: "Sports" },
  { name: "Science" },
  { name: "Politics" },
  { name: "World" },
];

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const {
    data: news = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["news", selectedCategory.name],
    queryFn: () => fetchFeedByCategory(selectedCategory.name),
  });

  return (
    <View style={styles.container}>
      {/* Categories */}
      <View style={{ paddingVertical: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory.name === category.name &&
                  styles.categorySelected,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory.name === category.name &&
                    styles.categoryTextSelected,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* News content */}
      <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : isError ? (
          <Text style={styles.errorText}>
            {(error as Error)?.message || "Error fetching news."}
          </Text>
        ) : news.length === 0 ? (
          <Text style={styles.noNewsText}>No news found.</Text>
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ArticleCard article={item} /> // single-column full width
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
  },
  categorySelected: {
    backgroundColor: "#fff",
  },
  categoryText: {
    color: "#aaa",
    fontSize: 14,
  },
  categoryTextSelected: {
    color: "#000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noNewsText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});
