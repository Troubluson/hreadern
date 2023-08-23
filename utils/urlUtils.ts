const API_URL = "https://hacker-news.firebaseio.com/";
const API_VERSION = "v0";
const DOT_JSON = ".json";

export const createUrl = (
  path: string,
  id?: string | number,
  apiVersion = API_VERSION
) => {
  const item = id ? `/${id}` : "";
  return `${API_URL}${apiVersion}/${path}${item}${DOT_JSON}`;
};