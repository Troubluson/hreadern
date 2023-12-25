<script setup lang="ts">
import type { ArticleComment } from "~/types";

const props = defineProps({
  comment: Object,
  replies: Array,
});
const comment = props.comment as ArticleComment;
const replies = props.replies as ArticleComment[];
const [newFirst, ...newReplies] = replies;
</script>

<template>
  <div v-if="comment" class="ml-6 pb-0">
    <p class="border p-2" v-html="comment.text"></p>
    <CommentChild :replies="newReplies" :comment="newFirst" />
  </div>
</template>
