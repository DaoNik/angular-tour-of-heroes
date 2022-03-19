export interface bookSet1 {
  id: number;
  title: string;
  description: string;
}

export interface bookSet2 {
  id: number;
  releaseDate: string;
  qtyRelease: number;
}

export interface newBookSet {
  title: string;
  description: string;
  releaseDate: string;
  id: number;
  qtyRelease: number;
}

export interface Books {
  set1: {
    data: bookSet1[];
  };
  set2: {
    data: bookSet2[];
  };
}
