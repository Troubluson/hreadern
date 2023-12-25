<script setup lang="ts">
import { timeSince } from "../utils/timeUtils";
import type { Story } from "~/types";

const props = defineProps({
  id: Number,
});

const id = props.id;
const { data: item } = useFetch<Story>(`/api/item/${id}`);

const urlToShow = computed(() => {
  const url = item.value?.url;
  const isGithubLink = url?.includes("github");
  const splitUrl = url?.split("/");
  const domain = splitUrl?.at(2) ?? "";
  return `${domain}${isGithubLink ? "/" + splitUrl?.at(3) : ""}`;
});
const commentsUrl = "/item?id=" + id;
</script>

<template>
  <div v-if="item" class="border-b border-emerald-600 p-4">
    <NuxtLink
      class="flex text-lg text-emerald-600 hover:text-emerald-400 gap-2"
      :to="item.url"
      ><p>{{ item.title }}</p>
      <p class="text-stone-400">({{ urlToShow }})</p>
    </NuxtLink>
    <div class="flex gap-2 text-xs text-stone-400">
      <p>{{ item.score }} points</p>
      <p>{{ timeSince(item.time) }}</p>
      <p>by {{ item.by }}</p>
      <NuxtLink :to="commentsUrl">
        comments: {{ item.descendants ?? 0 }}
      </NuxtLink>
    </div>
  </div>
</template>
