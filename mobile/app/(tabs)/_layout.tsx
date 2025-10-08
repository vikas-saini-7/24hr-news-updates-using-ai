import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#1e1e1e",
          borderTopColor: "#333",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "feed") iconName = "newspaper-outline";
          else if (route.name === "ai-summary") iconName = "sparkles-outline";
          else if (route.name === "top-stories")
            iconName = "trending-up-outline";
          else if (route.name === "profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="feed" options={{ title: "Feed" }} />
      <Tabs.Screen name="ai-summary" options={{ title: "AI Summary" }} />
      <Tabs.Screen name="top-stories" options={{ title: "Top Stories" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
