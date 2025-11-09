import React from "react";
import { Text, View } from "react-native";

type Props = {
  name: string;
  count: number;
};
function MapMarker({ name, count }: Props) {
  return (
    <View
      style={{
        backgroundColor: "black",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: "row",
      }}>
      <Text style={{ color: "white" }}>{name} : </Text>
      <Text style={{ color: "white" }}>{count}</Text>
    </View>
  );
}

export default React.memo(MapMarker);
