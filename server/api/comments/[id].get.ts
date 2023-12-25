import { child, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { Story } from "../../../types";

const STORY_PATH = "v0/item/";

export default eventHandler(async (event) => {
  try {
    const storyId = getRouterParam(event, "id");
    const path = STORY_PATH + storyId;
    const storySnapshot = await get(child(db, path));
    if (!storySnapshot.exists()) {
      throw new Error("could not get item");
    }
    const item = storySnapshot.val() as Story;
    return item;
  } catch (error) {
    console.error(error);
  }
});
