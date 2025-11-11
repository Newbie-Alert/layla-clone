import mongoose from 'mongoose';

type Coords = { lon: number; lat: number };

export interface IRegions extends Document {
  do: string;
  gu: string;
  dong: string;
  dongCoord: Coords; // 동 평균 좌표
  gu_coord: Coords; // 구 평균좌표
}

const regionSchema = new mongoose.Schema<IRegions>({
  do: {
    type: String,
  },
  gu: {
    type: String,
  },
  dong: {
    type: String,
  },
  dongCoord: {
    type: Object,
  },
  gu_coord: {
    type: Object,
  },
});

const Region = mongoose.model<IRegions>('Region', regionSchema);

export default Region;
