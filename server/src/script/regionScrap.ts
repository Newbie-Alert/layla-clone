import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const API_KEY = process.env.VWORLD_API_KEY;

const lists = [
  {
    do: '서울특별시',
    gu: '서대문구',
    dongList: [
      '연희동',
      '충현동',
      '천연동',
      '북아현동',
      '신촌동',
      '홍제2동',
      '홍은1동',
      '홍은2동',
    ],
  },
  {
    do: '서울특별시',
    gu: '마포구',
    dongList: [
      '서교동',
      '합정동',
      '아현동',
      '공덕동',
      '도화동',
      '용강동',
      '대흥동',
      '염리동',
      '신수동',
      '서강동',
      '연남동',
      '성산1동',
      '성산2동',
      '상암동',
    ],
  },
  {
    do: '서울특별시',
    gu: '은평구',
    dongList: [
      '녹번동',
      '구산동',
      '대조동',
      '역촌동',
      '신사1동',
      '신사2동',
      '증산동',
      '수색동',
      '진관동',
    ],
  },
];

const getCoords = async (address: string) => {
  try {
    const res = await axios.get(`https://api.vworld.kr/req/address`, {
      params: {
        service: 'address',
        request: 'getCoord',
        version: '2.0',
        crs: 'epsg:4326',
        refine: true,
        simple: false,
        format: 'json',
        type: 'road',
        address,
        key: API_KEY,
      },
    });

    const point = res.data?.response?.result?.point;
    if (!point) throw new Error('no point');
    return { lon: parseFloat(point.x), lat: parseFloat(point.y) };
  } catch (error) {
    console.log('좌표 없음');
    return null;
  }
};

(async () => {
  const results: any[] = [];

  for (const region of lists) {
    for (const dong of region.dongList) {
      const coord = await getCoords(dong);
      if (coord)
        results.push({
          do: region.do,
          gu: region.gu,
          dong,
          dongCoord: { ...coord },
        });
    }
  }

  const guGrouped = results.reduce((acc, cur) => {
    if (!acc[cur.gu]) acc[cur.gu] = [];
    acc[cur.gu].push(cur);
    return acc;
  }, {} as Record<string, any[]>);

  console.log(guGrouped);

  const guCoords = Object.entries(guGrouped).reduce((acc, [gu, list]) => {
    const first = (list as Record<string, any>[])[0]; // 첫 번째 동
    if (first?.dongCoord) {
      acc[gu] = {
        lat: first.dongCoord.lat,
        lon: first.dongCoord.lon,
      };
    }
    return acc;
  }, {} as Record<string, { lat: number; lon: number }>);

  const final = results.map((item) => ({
    ...item,
    gu_coord: guCoords[item.gu],
  }));

  fs.writeFileSync('regions_dong_with_gu.json', JSON.stringify(final, null, 2));
})();
