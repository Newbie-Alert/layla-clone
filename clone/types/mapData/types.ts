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
