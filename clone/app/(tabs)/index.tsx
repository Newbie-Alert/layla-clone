import {
  getListsByDong,
  getListsByGu,
  getListsDongDetail,
} from "@/apis/mapApi";
import useMainMap from "@/hooks/useMainMap";
import { useLocationContext } from "@/providers/LocationProvider";
import { AllListsItem, GroupedByGuItem } from "@/types/mapData/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

export default function Index() {
  const { location, errorMsg } = useLocationContext();
  const { region, handleRegionChange } = useMainMap();

  const mapRef = useRef<MapView>(null);
  const [mode, setMode] = useState<"gu" | "dong" | "detail">("gu");
  const [selected, setSelected] = useState<{ gu: string; dong: string }>({
    gu: "",
    dong: "",
  });
  const [markers, setMarkers] = useState<AllListsItem[] | GroupedByGuItem[]>(
    []
  );

  // ✅ React Query: 구/동 모드에 따라 API 분기
  const { data } = useQuery({
    queryKey: ["main", mode, selected.gu],
    queryFn: async () => {
      if (mode === "dong" && selected.gu)
        return await getListsByDong(selected.gu);
      if (mode === "detail" && selected.dong) {
        return await getListsDongDetail(selected.dong);
      }
      return await getListsByGu();
    },
    enabled: Boolean(location),
  });

  const zoomThreshold = 12;
  const zoomBuffer = 0.2;
  let zoomTimeout: ReturnType<typeof setTimeout>;

  // ✅ 줌 기반 모드 전환
  const handleZoomMode = (r: Region) => {
    const zoom = Math.log2(360 / r.longitudeDelta);

    clearTimeout(zoomTimeout);
    zoomTimeout = setTimeout(() => {
      // detail 모드라도, 충분히 줌 아웃하면 다시 dong/gu로 전환
      if (zoom < zoomThreshold - zoomBuffer && mode !== "gu") {
        setMode("gu");
        setSelected({ gu: "", dong: "" });
        return;
      }

      // detail 모드일 때는 줌 인/아웃을 통한 dong 재전환은 막음
      if (mode === "detail") return;

      if (zoom > zoomThreshold + zoomBuffer && mode !== "dong" && selected.gu) {
        setMode("dong");
      } else if (zoom < zoomThreshold - zoomBuffer && mode !== "gu") {
        setMode("gu");
        setSelected({ gu: "", dong: "" });
      }
    }, 300);
  };
  const handleRegionChangeComplete = (r: Region) => {
    handleRegionChange(r);
    handleZoomMode(r);
  };

  // ✅ 구 클릭 → 해당 구로 이동 + 동 모드 전환
  const handleGuPress = async (item: AllListsItem) => {
    setSelected((prev) => ({ ...prev, gu: item.gu, dong: "" }));
    await mapRef.current?.animateToRegion(
      {
        latitude: item.gu_coord.lat,
        longitude: item.gu_coord.lon,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      500
    );
    setMode("dong");
  };

  // ✅ 동 클릭 → 해당 동만 detail 모드로
  const handleDongPress = async (item: GroupedByGuItem) => {
    setSelected((prev) => ({ ...prev, dong: item.dong }));
    await mapRef.current?.animateToRegion(
      {
        latitude: item.dongCoord.lat,
        longitude: item.dongCoord.lon,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      },
      500
    );
  };

  useEffect(() => {
    if (data) setMarkers(data);
  }, [data]);

  const filteredMarkers = useMemo(() => {
    if (mode === "dong" && selected.gu) {
      return markers;
    }
    return markers;
  }, [markers, mode, selected.dong, selected.gu]);

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
      <MapView
        ref={mapRef}
        provider="google"
        showsUserLocation
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        style={{ flex: 1, width: "100%", height: "100%" }}>
        {filteredMarkers?.map((item) =>
          mode === "gu" && "gu" in item ? (
            <Marker
              key={item.gu}
              coordinate={{
                latitude: item.gu_coord.lat,
                longitude: item.gu_coord.lon,
              }}
              title={item.gu}
              description={`${item.count}개`}
              onPress={() => handleGuPress(item)}
            />
          ) : mode === "dong" && "dong" in item ? (
            <Marker
              key={item.dong}
              coordinate={{
                latitude: item.dongCoord.lat,
                longitude: item.dongCoord.lon,
              }}
              title={item.dong}
              description={`${item.count}개`}
              onPress={() => handleDongPress(item)}
            />
          ) : null
        )}
      </MapView>
    </View>
  );
}
