import { child, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { ArticleComment, FullStory, Item } from "~/types";
import { getCommentChild } from "../comments/[id].get";

const ITEM_PATH = "v0/item/";

export default eventHandler(async (event) => {
  try {
    const storyId = getRouterParam(event, "id");
    if (!storyId) {
      throw new Error("No id found");
    }
    const path = ITEM_PATH + storyId;
    const storySnapshot = await get(child(db, path));
    if (storySnapshot.exists()) {
      const story = storySnapshot.val() as Item;
      //Check if firebase can do it for me
      let comments: (ArticleComment | null)[] = [];
      if (story.kids) {
        const rawComments = await Promise.all(
          story.kids.map((childId) => getCommentChild(childId))
        );
        comments = rawComments.filter((comment) => comment != null);
      }

      return {
        story,
        comments,
      } as FullStory;
    } else {
      throw new Error("could not get item");
    }
  } catch (error) {
    console.error(error);
  }
});
