import { View, Text, StyleSheet } from "react-native";

export default function TopStories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Stories</Text>
      <Text style={styles.subtitle}>Top trending stories of the day.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a", // dark background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // white text
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaaaaa", // secondary text
    textAlign: "center",
  },
});
