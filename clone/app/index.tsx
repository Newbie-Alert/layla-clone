import { getListsByGu } from "@/apis/mapApi";
import useMainMap from "@/hooks/useMainMap";
import { useLocationContext } from "@/providers/LocationProvider";
import { AllListsItem, GroupedByGuItem } from "@/types/mapData/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Index() {
  const { location, errorMsg } = useLocationContext();
  const { region, handleRegionChange } = useMainMap();
  const [selected, setSelected] = useState<{
    gu: string;
    dong: string;
  }>({
    gu: "",
    dong: "",
  });
  const [markers, setmarkers] = useState<AllListsItem[] | GroupedByGuItem[]>();

  const handleSelected = (name: string) => {
    setSelected((prev) => ({ ...prev, gu: name }));
  };

  useEffect(() => {
    const fetchLists = async () => {
      const result = await getListsByGu();
      if (result) setmarkers(result);
    };

    if (location) {
      fetchLists();
    }
  }, [location]);

  if (!location) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>로딩 중..</Text>
      </View>
    );
  }

  if (!errorMsg) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

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
        region={region}
        onRegionChangeComplete={handleRegionChange}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}>
        {markers &&
          markers.length > 0 &&
          markers.map((item) => {
            if ("gu" in item) {
              return (
                <Marker
                  key={item.gu}
                  onPress={() =>
                    setSelected((prev) => ({ ...prev, gu: item.gu }))
                  }
                  coordinate={{
                    latitude: item.gu_coord.lat,
                    longitude: item.gu_coord.lon,
                  }}
                  title={item.gu}
                  description={`${item.count}개`}
                />
              );
            }
          })}
      </MapView>
    </View>
  );
}
