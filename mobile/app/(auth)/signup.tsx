import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../lib/api";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password)
      return Alert.alert("Error", "Please fill all fields");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      const { accessToken } = res.data.data;
      if (!accessToken) throw new Error("No token returned");

      await AsyncStorage.setItem("token", accessToken);
      router.replace("/(tabs)/feed");
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Error",
        err.response?.data?.message || err.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={{ color: "#ccc" }}>Already have an account? </Text>
            <Link href="/(auth)/login" style={styles.loginLink}>
              Log in
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center" },
  loginLink: { color: "#007bff", fontWeight: "600" },
});
