import { callAxios } from "@/lib/axios";

export const createRoom = async (
  listingId: string,
  buyerId: string,
  uploaderId: string
) => {
  const res = await callAxios.post("/chat", {
    listingId,
    buyerId,
    uploaderId,
  });

  return res.data;
};
