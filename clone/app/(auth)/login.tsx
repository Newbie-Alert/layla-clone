import { callAxios } from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type LoginParam = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [userInput, setUserInput] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const { setAuth } = useAuth();

  const handleLogin = async (param: LoginParam) => {
    const { email, password } = param;
    try {
      const res = await callAxios.post("/auth/login", { email, password });
      const user = res.data;
      if (res) {
        setAuth(user.token, user.userId);
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={styles.input}
        value={userInput.email}
        placeholder="이메일을 입력하세요"
        onChangeText={(text) => {
          setUserInput((prev) => ({ ...prev, email: text }));
        }}
      />
      <TextInput
        style={styles.input}
        value={userInput.password}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry={true}
        onChangeText={(text) => {
          setUserInput((prev) => ({ ...prev, password: text }));
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#388Cff",
          paddingVertical: 4,
          paddingHorizontal: 6,
        }}
        onPress={async () =>
          await handleLogin({
            email: userInput.email,
            password: userInput.password,
          })
        }>
        <Text style={{ color: "white" }}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    maxWidth: 200,
    backgroundColor: "#afafaf",
    marginBottom: 12,
  },
});
