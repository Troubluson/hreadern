<script setup lang="ts">
import { Comment } from "types";

const props = defineProps({
  comment: Object,
  replies: Array,
});
const comment = props.comment as Comment;
const replies = props.replies as Comment[];
const [newFirst, ...newReplies] = replies;
</script>

<template>
  <div v-if="comment" class="ml-6 pb-0">
    <p class="border p-2" v-html="comment.text"></p>
    <CommentChild :replies="newReplies" :comment="newFirst" />
  </div>
</template>
