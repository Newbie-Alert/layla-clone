import { createRoom } from "@/apis/chatApis";
import { getItemDetail } from "@/apis/mapApi";
import { useAuth } from "@/providers/AuthProvider";
import { BuildingListItem } from "@/types/mapData/types";
import { formatPrice } from "@/util/formatPrice";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";

export default function ItemDetail() {
  const { auth } = useAuth();
  const router = useRouter();
  const { height } = Dimensions.get("screen");
  const { id } = useLocalSearchParams<{ id: string }>();

  const [detail, setDetail] = useState<BuildingListItem | null>(null);

  const sheetRef = useRef<BottomSheet>(null);

  const { error } = useQuery({
    queryKey: ["item-detail", id],
    queryFn: () => getItemDetail(id),
    enabled: Boolean(id),
    select(data) {
      setDetail(data);
    },
  });

  if (!detail) return;

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <PagerView style={{ height: (height * 1.5) / 3 }}>
          <View
            key="1"
            style={{
              backgroundColor: "gray",
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
        </PagerView>

        <View style={{ padding: 12, gap: 3 }}>
          <Text style={{ fontSize: 18, color: "#696969" }}>
            [{detail.opbiz_restagnt_sgg_nm}]
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 700 }}>
            {formatPrice(detail.thing_amt)}
          </Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {[detail.bldg_usg, detail.arch_area].map((item, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    backgroundColor: "#e6e6e6",
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                    borderRadius: 4,
                  }}>
                  <Text style={{ fontSize: 14 }}>
                    {isNaN(Number(item)) ? item : `${item} ㎡`}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text>{detail.desc}</Text>
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        handleIndicatorStyle={{
          display: "none",
        }}>
        <BottomSheetView
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 16,
          }}>
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#388Cff",
              width: 200,
              height: 36,
              borderRadius: 6,
            }}>
            <Text
              style={{ color: "white", fontSize: 18, fontWeight: 600 }}
              onPress={async () => {
                try {
                  const { id: roomId } = await createRoom(
                    detail._id,
                    "690da150e3ef1308c7999dff",
                    detail.uploaderId
                  );

                  router.push({
                    pathname: "/(tabs)/chat",
                    params: { roomId, senderId: auth.userId },
                  });
                } catch (error) {
                  console.log(error);
                }
              }}>
              채팅하기
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
