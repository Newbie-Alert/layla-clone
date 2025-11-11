import {
  getListsByDong,
  getListsByGu,
  getListsDongDetail,
} from "@/apis/mapApi";
import {
  AllListsItem,
  BuildingListItem,
  GroupedByGuItem,
} from "@/types/mapData/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import MapView, { Region } from "react-native-maps";

export default function useMainMap() {
  const initRegion = {
    latitude: 37.61053070801393,
    latitudeDelta: 0.27302347457646334,
    longitude: 126.983706895262,
    longitudeDelta: 0.23732420057056913,
  };

  const [region, setRegion] = useState<Region>(initRegion);

  const handleRegionChange = (r: Region) => {
    const maxLatDelta = initRegion.latitudeDelta;
    const maxLonDelta = initRegion.longitudeDelta;

    const latBound = 2.0;
    const lonBound = 2.0;

    const newLat = Math.min(
      Math.max(r.latitude, initRegion.latitude - latBound),
      initRegion.latitude + latBound
    );
    const newLon = Math.min(
      Math.max(r.longitude, initRegion.longitude - lonBound),
      initRegion.longitude + lonBound
    );

    const newLatDelta = Math.min(r.latitudeDelta, maxLatDelta);
    const newLonDelta = Math.min(r.longitudeDelta, maxLonDelta);

    if (
      Math.abs(newLat - region.latitude) > 0.0001 ||
      Math.abs(newLon - region.longitude) > 0.0001 ||
      Math.abs(newLatDelta - region.latitudeDelta) > 0.0001 ||
      Math.abs(newLonDelta - region.longitudeDelta) > 0.0001
    ) {
      setRegion({
        latitude: newLat,
        longitude: newLon,
        latitudeDelta: newLatDelta,
        longitudeDelta: newLonDelta,
      });
    }
  };

  const mapRef = useRef<MapView>(null);
  const [mode, setMode] = useState<"gu" | "dong" | "detail">("gu");
  const [selected, setSelected] = useState<{ gu: string; dong: string }>({
    gu: "",
    dong: "",
  });
  const [markers, setMarkers] = useState<AllListsItem[] | GroupedByGuItem[]>(
    []
  );
  const [detail, setDetail] = useState<BuildingListItem[] | null>();

  const { data } = useQuery({
    queryKey: ["main", mode, selected.gu],
    queryFn: async () => {
      if (mode === "dong" && selected.gu)
        return await getListsByDong(selected.gu);

      return await getListsByGu();
    },
    enabled: Boolean(location),
  });

  const { data: dongDetail } = useQuery({
    queryKey: ["dong-detail", selected.dong],
    queryFn: async () => {
      if (selected.dong) {
        return await getListsDongDetail(selected.dong);
      }
    },
    enabled: Boolean(selected.dong),
  });

  const zoomThreshold = 12;
  const zoomBuffer = 0.2;
  let zoomTimeout: ReturnType<typeof setTimeout>;

  // 줌에 따라 mode 변경
  const handleZoomMode = (r: Region) => {
    const zoom = Math.log2(360 / r.longitudeDelta);

    clearTimeout(zoomTimeout);
    zoomTimeout = setTimeout(() => {
      if (zoom < zoomThreshold - zoomBuffer && mode !== "gu") {
        setMode("gu");
        setSelected({ gu: "", dong: "" });
        return;
      }

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

  useEffect(() => {
    if (dongDetail) {
      setDetail(dongDetail);
    }
  }, [selected.dong]);

  const filteredMarkers = useMemo(() => {
    if (mode === "dong" && selected.gu) {
      return markers;
    }
    return markers;
  }, [markers, mode, selected.dong, selected.gu]);

  return {
    mapRef,
    handleRegionChangeComplete,
    filteredMarkers,
    mode,
    region,
    handleRegionChange,
    handleGuPress,
    handleDongPress,
    detail,
  };
}
