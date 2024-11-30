// components/GoogleLoginButton.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
    scopes: ["email"],
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      onLoginSuccess(response);
    }
  }, [response]);

  const handleLogin = () => {
    promptAsync({ prompt: "select_account" });
  };

  return (
    <TouchableOpacity
      style={[styles.button, styles.googleButton]}
      onPress={handleLogin}
    >
      <Text style={styles.buttonText}>Đăng nhập với Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    width: "100%",
  },
  googleButton: {
    backgroundColor: "#333", // Màu nền Google button (dark gray)
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default GoogleLoginButton;