<script setup lang="ts">
import { Story } from "types";
import { createUrl } from "../utils/urlUtils";

const STORY_TYPES = ["top", "new"];

const storyPage = ref(0);
const sortBy = ref(STORY_TYPES[0]);
const fetchUrl = computed(() => `/api/list/${sortBy.value}`);
const setSortBy = (newIndex: string) => (sortBy.value = newIndex);
const { data: storyIds, pending } = useFetch<number[]>(fetchUrl, {
  watch: [sortBy],
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
          @click="setSortBy('top')"
          type="button"
          class="inline-block rounded-l bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          New
        </button>
        <button
          @click="setSortBy('new')"
          type="button"
          class="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          Best
        </button>
      </div>
    </div>
    <div>
      <div v-if="pending">Loading</div>
      <div v-for="id in storyIds" :key="id">
        <ListArticleItem :id="id" />
      </div>
    </div>
  </div>
</template>

<style></style>
