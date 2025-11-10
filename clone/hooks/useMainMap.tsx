import { useState } from "react";
import { Region } from "react-native-maps";

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

    // 이전 region과 거의 같으면 setState 생략 (무한루프 방지)
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
  return { region, handleRegionChange };
}
