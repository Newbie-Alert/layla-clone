import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          paddingBottom: 12,
          borderColor: "transparent",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIcon: () => null,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "매물 찾기",
          tabBarIcon: () => {
            return <Ionicons name="search" />;
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: () => {
            return <Ionicons name="chatbox" />;
          },
        }}
      />
    </Tabs>
  );
}
