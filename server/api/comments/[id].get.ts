import { child, get } from "firebase/database";
import { db } from "../../lib/firebase";
import { ArticleComment, Story } from "../../../types";

const ITEM_PATH = "v0/item/";

export default eventHandler(async (event) => {
  try {
    const storyId = getRouterParam(event, "id");
    if (!storyId) {
      throw new Error("No id found");
    }
    const comment = await getCommentChild(storyId);
    if (comment) {
      return comment;
    } else return null;
  } catch (error) {
    console.error(error);
  }
});

export const getCommentChild = async (childId: string | number) => {
  try {
    const commentPath = ITEM_PATH + childId;
    const commentSnapshot = await get(child(db, commentPath));
    if (commentSnapshot.exists()) {
      const comment = commentSnapshot.val() as ArticleComment;
      //comment.text = converter.makeHtml(comment.text);
      return comment;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
