import { useLocationContext } from "@/providers/LocationProvider";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function Index() {
  const { location, errorMsg } = useLocationContext();

  console.log(location);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <MapView
        provider="google"
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.562935718,
          longitude: 126.962356734,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
