import AuthProvider from "@/providers/AuthProvider";
import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      </Stack>
    </AuthProvider>
  );
}
