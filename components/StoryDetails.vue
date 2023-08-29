<script setup lang="ts">
import { Comment, Story } from "types";
import { createUrl } from "../utils/urlUtils";

const route = useRoute();
const itemId = route.query["id"] as string;
const comments = ref<Comment[]>([]);
const { data: story } = useFetch<Story>("/api/item/" + itemId);

watchEffect(async () => {
  const commentIds = story.value?.kids ?? [];
  const commentItemResponses = await Promise.all(
    commentIds.map((commentId) => fetch(createUrl("/item", commentId)))
  );
  comments.value = await Promise.all(
    commentItemResponses.map(async (res) => (await res.json()) as Comment)
  );
});
</script>

<template>
  <div class="p-4">
    <NuxtLink :to="story?.url" class="text-stone-400 hover:text-stone-300">
      <h1 class="text-3xl">
        {{ story?.title }}
      </h1>
      <h2 class="text-1xl">
        {{ story?.url }}
      </h2>
    </NuxtLink>
    <h2 class="text-2xl text-stone-400">Comments</h2>
    <div class="text-emerald-600 text-sm" v-for="comment in comments">
      <CommentChain :comment="comment" />
    </div>
  </div>
</template>
