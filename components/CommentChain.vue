<script setup lang="ts">
import { Comment } from "types";
const props = defineProps({
  comment: Object,
});
const comment = props.comment as Comment;
const childComments = ref<Comment[]>([]);
watchEffect(async () => {
  const childCommentIds = comment?.kids ?? [];
  const childCommentResponses = await Promise.all(
    childCommentIds.map((commentId) => fetch(createUrl("/item", commentId)))
  );
  childComments.value = await Promise.all(
    childCommentResponses.map(async (res) => (await res.json()) as Comment)
  );
});
</script>

<template>
  <div>
    <div v-if="comment" class="ml-6 mb-4">
      <p class="border p-2" v-html="comment.text"></p>
      <div v-for="child in childComments">
        <CommentChain :comment="child" />
      </div>
    </div>
  </div>
</template>
