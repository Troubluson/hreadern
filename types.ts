interface ItemBase {
  id: number;
  by: string;
  kids: number[];
  time: number;
  type: string;
}

type ItemType = "job" | "story" | "comment" | "poll" | "pollopt";

export interface Item {
  id: number;
  deleted?: boolean;
  type?: ItemType;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: string;
  descendants?: number[];
}

export interface ArticleComment extends ItemBase {
  text: string;
  deleted?: boolean;
  dead?: boolean;
}

export interface Story extends ItemBase {
  url: string;
  descendants: number[];
  title: string;
  score: number;
}

export interface FullStory {
  story: Item;
  comments: ArticleComment[];
}
