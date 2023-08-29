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
      <div class="inline-flex" role="group">
        <button
          @click="setSortBy('top')"
          type="button"
          :class="{ 'border rounded border-emerald-700': sortBy === 'top' }"
          class="inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 hover:bg-zinc-950 active:bg-zinc-900"
        >
          Top
        </button>
        <button
          @click="setSortBy('new')"
          type="button"
          :class="{ 'border rounded border-emerald-700': sortBy === 'new' }"
          class="inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 hover:bg-zinc-950 active:bg-zinc-900"
        >
          New
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
