import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  category?: string;
  imageCover?: string;
  slug: string;
  isSaved?: boolean;
}

interface ArticleCardProps {
  article: Article;
}

const screenWidth = Dimensions.get("window").width;
const CARD_PADDING = 20;

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <View style={styles.card}>
      {/* Cover Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={
            article.imageCover
              ? { uri: article.imageCover }
              : require("@/assets/images/placeholder-news.png")
          }
          style={styles.image}
          resizeMode="cover"
        />
        {/* You can add SaveButton here */}
      </View>

      {/* Title */}
      <View style={styles.content}>
        <Text style={styles.title}>
          {article.title.length > 80
            ? article.title.slice(0, 80) + "..."
            : article.title}
        </Text>
        {article.summary && (
          <Text style={styles.summary}>
            {article.summary.length > 120
              ? article.summary.slice(0, 120) + "..."
              : article.summary}
          </Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {article.category && (
          <Text style={styles.category}>#{article.category}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            // Navigate to detail screen, e.g., using react-navigation
            // navigation.navigate("NewsDetail", { slug: article.slug });
          }}
        >
          <Text style={styles.readMore}>Read Article</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth - CARD_PADDING * 2,
    backgroundColor: "#141416",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    alignSelf: "center",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  summary: {
    color: "#aaa",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  category: {
    color: "#ccc",
    fontSize: 12,
  },
  readMore: {
    color: "#007bff",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ArticleCard;
