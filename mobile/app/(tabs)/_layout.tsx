import { Tabs } from "expo-router";
import {
  IconSparkles,
  IconFlame,
  IconUser,
  IconHome,
} from "@tabler/icons-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function TabsLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#0a0a0a" },
          headerTintColor: "#fff",
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#141416",
            borderTopColor: "#222",
            height: 80,
            paddingTop: 16,
          },
          tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "feed":
                return <IconHome size={size} color={color} strokeWidth={2} />;
              case "ai-summary":
                return (
                  <IconSparkles size={size} color={color} strokeWidth={2} />
                );
              case "top-stories":
                return <IconFlame size={size} color={color} strokeWidth={2} />;
              case "profile":
                return <IconUser size={size} color={color} strokeWidth={2} />;
              default:
                return null;
            }
          },
        })}
      >
        <Tabs.Screen name="feed" options={{ title: "News.AI" }} />
        <Tabs.Screen name="ai-summary" options={{ title: "AI Summary" }} />
        <Tabs.Screen name="top-stories" options={{ title: "Top Stories" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </QueryClientProvider>
  );
}
