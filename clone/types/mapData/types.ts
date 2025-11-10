type Coords = { lat: number; lon: number };

export type AllListsItem = {
  count: number;
  gu: string;
  gu_coord: Coords;
};

export type GroupedByGuItem = {
  count: number;
  dong: string;
  dongCoord: Coords;
};

export interface BuildingListItem {
  _id: string; // MongoDB ObjectId
  arch_area: number; // 연면적 (㎡)
  sno: string; // 일련번호
  rcpt_yr: string; // 접수연도
  opbiz_restagnt_sgg_nm: string; // 시군구명 (예: "서울 은평구")
  stdg_nm: string; // 행정동명 (예: "녹번동")
  land_area: number; // 대지면적 (㎡)
  lotno_se: string; // 지번구분 (예: "1")
  thing_amt: string; // 물건금액 (단위: 만원)
  rght_se: string | null; // 권리구분 (null 허용)
  rtrcn_day: string | null; // 철거일자 (YYYYMMDD)
  flr: number; // 층수
  cgg_cd: string; // 자치구 코드
  ctrt_day: string; // 계약일자 (YYYYMMDD)
  bldg_usg: string; // 건물용도 (예: "연립다세대")
  stdg_cd: string; // 행정동 코드
  bldg_nm: string; // 건물명
  dclr_se: string; // 신고구분 (예: "중개거래")
  mno: string; // 관리번호
  cgg_nm: string; // 구 이름 (예: "은평구")
  lotno_se_nm: string; // 지번구분명 (예: "대지")
  arch_yr: string; // 건축년도 (YYYY)
  desc: string;
  uploaderId: string;
}

export type Message = {
  roomId?: string;
  senderId: string;
  message: string;
  createdAt: string;
};
