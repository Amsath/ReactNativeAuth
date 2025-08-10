import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/validators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const e: typeof errors = {};
        if (!email) e.email = "Email is required";
        else if (!isValidEmail(email)) e.email = "Invalid email format";

        if (!password) e.password = "Password is required";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setLoading(true);
        const res = await login(email.trim(), password);
        setLoading(false);
        if (!res.ok) {
            setErrors((prev) => ({ ...prev, general: res.message || "Login failed" }));
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Welcome back</Text>
                {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}
                <FormInput
                    label="Email"
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    error={errors.email}
                />
                <View>
                    <FormInput
                        label="Password"
                        placeholder="••••••"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        error={errors.password}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword((s) => !s)}
                        style={styles.togglePassword}
                        accessibilityLabel="Toggle password visibility"
                    >
                        <Feather
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color="#2f80ed"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
                </TouchableOpacity>

                <View style={styles.row}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.link}> Go to Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f6f7fb" },
    card: { backgroundColor: "white", borderRadius: 12, padding: 20, elevation: 3 },
    title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
    button: {
        backgroundColor: "#2f80ed",
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: { color: "white", fontWeight: "700" },
    row: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
    link: { color: "#2f80ed", fontWeight: "700" },
    generalError: { color: "#f44336", marginBottom: 8 },
    togglePassword: { position: "absolute", right: 12, top: 37 }, // adjust if necessary
    toggleText: { color: "#2f80ed", fontWeight: "600" },
});

export default LoginScreen;
