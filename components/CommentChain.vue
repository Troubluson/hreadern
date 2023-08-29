<script setup lang="ts">
import { Comment } from "types";
const props = defineProps({
  comment: Object,
});
const comment = props.comment as Comment;
const childComments = ref<Comment[]>([]);
watchEffect(async () => {
  const childCommentIds = comment?.kids ?? [];
  childComments.value = await Promise.all(
    childCommentIds.map((commentId) =>
      fetch(createUrl("/item", commentId)).then((res) => res.json())
    )
  );
});
</script>

<template>
  <div>
    <div v-if="comment" class="ml-6 mb-4">
      <div class="border p-2">
        <p class="text-stone-400">
          {{ comment.by }}
          {{ timeSince(comment.time) }}
        </p>
        <p v-html="comment.text"></p>
        comment
      </div>
      <div v-for="child in childComments">
        <CommentChain :comment="child" />
      </div>
    </div>
  </div>
</template>
