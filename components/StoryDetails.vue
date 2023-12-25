<script setup lang="ts">
import type { FullStory } from "~/types";

const route = useRoute();
const itemId = route.query["id"] as string;
const { data: fullStory, pending } = await useFetch<FullStory>(
  `/api/item_details/${itemId}`
);
const story = fullStory.value?.story;
const comments = fullStory.value?.comments;
</script>

<template>
  <div v-if="pending">Loading</div>
  <div class="p-4">
    <NuxtLink :to="story?.url" class="text-stone-400 hover:text-stone-300">
      <h1 class="text-3xl">
        {{ story?.title }}
      </h1>
      <h2 class="text-1xl">
        {{ story?.url }}
      </h2>
    </NuxtLink>
    <h2 class="text-2xl text-stone-400 mb-2">Comments:</h2>
    <div class="text-emerald-600 text-sm" v-for="comment in comments">
      <CommentChain :comment="comment" />
    </div>
  </div>
</template>
