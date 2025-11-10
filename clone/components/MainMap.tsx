import useMainMap from "@/hooks/useMainMap";
import { formatPrice } from "@/util/formatPrice";
import BottomSheet, {
  BottomSheetScrollView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MainMap() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  const {
    region,
    mapRef,
    mode,
    filteredMarkers,
    handleGuPress,
    handleRegionChangeComplete,
    handleDongPress,
    detail,
  } = useMainMap();

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
      {detail && (
        <BottomSheet ref={bottomSheetRef} snapPoints={[200, 500]}>
          <BottomSheetScrollView
            contentContainerStyle={{
              padding: 20,
            }}>
            {detail?.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  style={{ width: "100%" }}
                  onPress={() =>
                    router.push({
                      pathname: "/pages/item-detail",
                      params: { id: item._id },
                    })
                  }>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}>
                    <View
                      style={{
                        backgroundColor: "gray",
                        flex: 1,
                        maxWidth: 150,
                        height: 100,
                        borderRadius: 10,
                        position: "relative",
                      }}>
                      <Text
                        style={{
                          color: "white",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: [
                            {
                              translateX: "-50%",
                            },
                            {
                              translateY: "-50%",
                            },
                          ],
                        }}>
                        이미지 없음
                      </Text>
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text>[{item.opbiz_restagnt_sgg_nm}]</Text>
                      <Text style={{ fontSize: 21, fontWeight: 700 }}>
                        {formatPrice(item.thing_amt)}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 6 }}>
                        {[item.bldg_usg, item.arch_area].map((item, idx) => {
                          return (
                            <View
                              key={idx}
                              style={{
                                backgroundColor: "#e6e6e6",
                                paddingVertical: 3,
                                paddingHorizontal: 5,
                                borderRadius: 4,
                              }}>
                              <Text style={{ fontSize: 11 }}>
                                {isNaN(Number(item)) ? item : `${item} ㎡`}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
}
