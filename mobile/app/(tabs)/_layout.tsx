import { Tabs } from "expo-router";
import {
  IconSparkles,
  IconFlame,
  IconUser,
  IconHome,
} from "@tabler/icons-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: "#0a0a0a" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#141416",
          borderTopColor: "#222",
          height: 80,
          paddingTop: 16,
        },
        tabBarShowLabel: false,

        tabBarIcon: ({ color, size }) => {
          if (route.name === "feed")
            return <IconHome size={size} color={color} strokeWidth={2} />;
          else if (route.name === "ai-summary")
            return <IconSparkles size={size} color={color} strokeWidth={2} />;
          else if (route.name === "top-stories")
            return <IconFlame size={size} color={color} strokeWidth={2} />;
          else if (route.name === "profile")
            return <IconUser size={size} color={color} strokeWidth={2} />;
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
