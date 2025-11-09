import { callAxios } from "@/lib/axios";

export const getListsByGu = async (query?: string) => {
  try {
    const res = await callAxios("/lists", {
      method: "GET",
      params: {
        gu: query,
      },
    });
    const lists = res.data;
    return lists;
  } catch (error) {
    console.log("구 단위 리스트 fetch 실패");
  }
};
