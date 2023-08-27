import { child, get } from "firebase/database";
import { db } from "../../lib/firebase";

const STORY_PATH = "v0/item/";

export default eventHandler(async (event) => {
  try {
    const storyId = getRouterParam(event, "id");
    const path = STORY_PATH + storyId;
    const storySnapshot = await get(child(db, path));
    if (storySnapshot.exists()) {
      return storySnapshot.val();
    } else {
      throw new Error("could not get item");
    }
  } catch (error) {
    console.error(error);
  }
});
