import { Message } from "@/types/mapData/types";
import * as Device from "expo-device";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import io from "socket.io-client";

export default function Chat() {
  const { roomId, senderId } = useLocalSearchParams<{
    roomId: string;
    senderId: string;
  }>();

  const isDevice = Device.isDevice;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // 🔌 서버 연결
  const socket = io("http://211.217.226.59:8080", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);

      socket.emit("joinRoom", roomId);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      senderId: isDevice
        ? "690da150e3ef1308c7999dff"
        : "6911b0caf01f9491bf8f8d72",
      message,
    });

    setMessages((prev) => [
      ...prev,
      { senderId, message, createdAt: new Date().toISOString() },
    ]);

    setMessage("");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.senderId === senderId ? "flex-end" : "flex-start",
              backgroundColor:
                item.senderId === senderId ? "#4E8FFF" : "#ECECEC",
              padding: 10,
              borderRadius: 10,
              marginVertical: 4,
              maxWidth: "80%",
            }}>
            <Text
              style={{ color: item.senderId === senderId ? "white" : "black" }}>
              {item.message}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
        <TextInput
          placeholder="메시지를 입력하세요"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 40,
          }}
          value={message}
          onChangeText={setMessage}
        />
        <Button title="전송" onPress={sendMessage} />
      </View>
    </View>
  );
}
