export interface bookSet1 {
  id: number;
  title: string;
  description: string;
}

export interface bookDataSet1 {
  set1: {
    data: bookSet1[]
  }
}

export interface bookSet2 {
  id: number;
  releaseDate: string;
  qtyRelease: number;
}

export interface bookDataSet2 {
  set2: {
    data: bookSet2[]
  }
}

export interface newBookSet extends bookSet1 {
  releaseDate: string;
  qtyRelease: number;
}

