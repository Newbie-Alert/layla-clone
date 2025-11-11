import { callAxios } from "@/lib/axios";

export const getListsByGu = async () => {
  try {
    const res = await callAxios.get("/lists", {
      method: "GET",
    });
    const lists = res.data;
    return lists;
  } catch (error) {
    console.log("구 단위 리스트 fetch 실패");
  }
};

export const getListsByDong = async (queryParam: string) => {
  if (!queryParam) {
    console.log("쿼리가 없습니다.");
    return;
  }

  try {
    const res = await callAxios.get("/lists", {
      params: { gu: queryParam },
    });
    return res.data;
  } catch (error) {
    console.log("동 단위 리스트 fetch 실패");
  }
};

export const getListsDongDetail = async (queryParam: string) => {
  if (!queryParam) {
    console.log("쿼리가 없습니다.");
    return;
  }

  try {
    const res = await callAxios.get("/lists", {
      params: { dong: queryParam },
    });
    return res.data;
  } catch (error) {
    console.log("동 매물 상세 리스트 fetch 실패");
  }
};

export const getItemDetail = async (id: string) => {
  try {
    const res = await callAxios.get(`/lists/${id}`);
    return res.data;
  } catch (error) {
    console.log("매물 상세정보 조회 실패");
  }
};
