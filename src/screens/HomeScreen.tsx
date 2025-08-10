import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome,</Text>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f6f7fb", alignItems: "center", justifyContent: "center" },
  welcome: { fontSize: 18 },
  name: { fontSize: 26, fontWeight: "700", marginTop: 6 },
  email: { fontSize: 16, color: "#666", marginTop: 4 },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: { color: "white", fontWeight: "700" },
  note: { marginTop: 20, color: "#999", fontSize: 12, textAlign: "center" },
});

export default HomeScreen;
