// screens/WelcomeScreen.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ButtonComponent,
  CarouselComponent,
  GoogleLoginButton,
} from "../components/wellCome";
import { APP_ENVS, APP_ROUTES } from "../constants";
import { authService } from "../services";

const data = [
  {
    title: "Tham gia khóa học video",
    description:
      "Khám phá những khóa học video hấp dẫn từ các chuyên gia hàng đầu.",
    image: require("../assets/wellCome/wc1.png"),
  },
  {
    title: "Học hỏi từ giới tinh hoa",
    description: "Tìm hiểu và trau dồi kiến thức từ những người giỏi nhất.",
    image: require("../assets/wellCome/wc2.png"),
  },
  {
    title: "Tiếp cận công nghệ mới",
    description:
      "Khám phá các xu hướng và công nghệ tiên tiến để bắt kịp thời đại.",
    image: require("../assets/wellCome/wc3.png"),
  },
  {
    title: "Mở rộng kỹ năng của bạn",
    description:
      "Học các kỹ năng mới và nâng cao bản thân với các bài giảng chất lượng.",
    image: require("../assets/wellCome/wc4.png"),
  },
];

const WelcomeScreen = ({ navigation }) => {
  const handleLoginSuccess = async (response) => {
    if (response?.type === "success") {
      const idToken = response?.params?.id_token;
      const res = await authService.login({
        idToken,
        audience: APP_ENVS.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      });

      const { accessToken, refreshToken } = res.data;
      await saveTokensToStorage(accessToken, refreshToken);
    }
  };

  const saveTokensToStorage = async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Error saving tokens", error);
    }
  };

  const handleBrowse = () => {
    navigation.replace(APP_ROUTES.HOME);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CarouselComponent
          data={data}
          onSnapToItem={(index) => console.log(`Active slide: ${index}`)}
        />
        <View style={styles.buttons}>
          <ButtonComponent
            title="Khám phá"
            onPress={handleBrowse}
            style={[styles.fullWidthButton, styles.browseButton]}
          />
          <GoogleLoginButton
            onLoginSuccess={handleLoginSuccess}
            style={[styles.fullWidthButton, styles.loginButton]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  fullWidthButton: {
    width: "100%",
    marginBottom: 15,
    paddingVertical: 12,
  },
  browseButton: {
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#333",
    color: "#fff",
  },
});

export default WelcomeScreen;
