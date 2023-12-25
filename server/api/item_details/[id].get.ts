import { child, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { ArticleComment, FullStory, Story } from "~/types";

const ITEM_PATH = "v0/item/";

export default eventHandler(async (event) => {
  try {
    const storyId = getRouterParam(event, "id");
    const path = ITEM_PATH + storyId;
    const storySnapshot = await get(child(db, path));
    if (storySnapshot.exists()) {
      const story = storySnapshot.val() as Story;
      console.log(story.kids);
      //Check if firebase can do it for me
      const rawComments = await Promise.all(
        story.kids.map((childId) => getItemChild(childId))
      );
      const comments = rawComments.filter((comment) => comment != null);

      console.log(comments);
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

const getItemChild = async (childId: string | number) => {
  try {
    const commentPath = ITEM_PATH + childId;
    const commentSnapshot = await get(child(db, commentPath));
    if (commentSnapshot.exists()) {
      return commentSnapshot.val() as ArticleComment;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
