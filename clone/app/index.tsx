import { View } from "react-native";
import MapView from "react-native-maps";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <MapView provider="google" />
    </View>
  );
}
