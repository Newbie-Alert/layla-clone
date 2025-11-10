import MainMap from "@/components/MainMap";
import { useLocationContext } from "@/providers/LocationProvider";
import { Text, View } from "react-native";

export default function Index() {
  const { location, errorMsg } = useLocationContext();

  if (!location) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>로딩 중..</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MainMap />
    </View>
  );
}
