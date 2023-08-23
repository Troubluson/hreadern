<script setup lang="ts">
import { Story } from "types";
import { createUrl } from "../utils/urlUtils";

const PATHS = ["/newstories", "/beststories"];

const storyIds = ref<number[]>([]);
const storyPage = ref(0);
const storiesToDisplay = ref<Story[]>([]);
const sortByIndex = ref(0);

const setSortByIndex = (newIndex: number) => (sortByIndex.value = newIndex);

watchEffect(async () => {
  // this effect will run immediately and then
  // re-run whenever currentBranch.value changes
  const url = createUrl(PATHS[sortByIndex.value]);
  const response = await fetch(url);
  storyIds.value = (await response.json()) as number[];
});

watchEffect(async () => {
  const start = storyPage.value * 50;
  const storiesToFetch = storyIds.value.slice(start, start + 50);
  const responsePromises = storiesToFetch.map((storyId) =>
    fetch(createUrl("/item", storyId))
  );
  const responses = await Promise.all(responsePromises);
  const itemPromises = responses.map(async (res) => {
    return res.json();
  });
  storiesToDisplay.value = (await Promise.all(itemPromises)) as Story[];
});
</script>

<template>
  <div>
    <div class="flex">
      <div
        class="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        role="group"
      >
        <button
          @click="setSortByIndex(0)"
          type="button"
          class="inline-block rounded-l bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          New
        </button>
        <button
          @click="setSortByIndex(1)"
          type="button"
          class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          Best
        </button>
      </div>
    </div>
    <div>
      <div v-for="story in storiesToDisplay" :key="story.id">
        <ListArticleItem :item="story" />
      </div>
    </div>
  </div>
</template>

<style></style>
