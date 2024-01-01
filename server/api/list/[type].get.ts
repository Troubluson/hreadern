import { get, child, query, limitToFirst, orderByKey } from "firebase/database";
import { db } from "../../lib/firebase";

const LIST_PATH = "v0/";

export default eventHandler(async (event) => {
  try {
    const type = getRouterParam(event, "type") ?? "top";
    const path = LIST_PATH + type + "stories";
    const storySnapshot = await get(
      query(child(db, path), limitToFirst(50), orderByKey())
    );
    if (storySnapshot.exists()) {
      return storySnapshot.val();
    } else {
      throw new Error("could not get stories");
    }
  } catch (error) {
    console.error(error);
  }
});
