import React from "react";
import { Text, View } from "react-native";

export interface LocationContext {
  loaction: Location;
}

export default function LocationProvider() {
  return (
    <View>
      <Text>LocationProvider</Text>
    </View>
  );
}
