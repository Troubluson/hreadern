interface ItemBase {
  id: number;
  by: string;
  kids: number[];
  time: number;
  type: string;
}

export interface Comment extends ItemBase {
  text: string;
}

export interface Story extends ItemBase {
  url: string;
  descendants: number[];
  title: string;
  score: number;
}
