// app/(tabs)/saved.tsx
import { View, Text, StyleSheet } from "react-native";

export default function Saved() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
  },
});
