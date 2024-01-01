<script setup lang="ts">
import type { ArticleComment } from "~/types";
const props = defineProps({
  comment: Object,
});
const comment = props.comment as ArticleComment;
const childComments = ref<ArticleComment[]>([]);
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
      <div
        v-if="!comment.deleted && !comment.dead"
        class="border-b p-2 border-stone-400"
      >
        <p class="text-stone-400">
          {{ comment.by }}
          {{ timeSince(comment.time) }}
        </p>
        <div v-html="comment.text"></div>
      </div>
      <div v-for="child in childComments">
        <CommentChain :comment="child" />
      </div>
    </div>
  </div>
</template>
