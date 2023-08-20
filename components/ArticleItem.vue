<script setup lang="ts">
import { Item } from "types";
const props = defineProps({
  item: Object,
});

const item = props.item as Item;
const urlToShow = computed(() => {
  const url = item.url;
  const isGithubLink = url?.includes("github");
  const splitUrl = url?.split("/");
  const domain = splitUrl?.at(2) ?? "";
  return `${domain} ${isGithubLink ? splitUrl?.at(3) : ""}`;
});
</script>

<template>
  <div class="border-b border-emerald-600 p-4">
    <a
      class="flex text-lg text-emerald-600 hover:text-emerald-400 gap-2"
      :href="item.url"
      ><p>{{ item.title }}</p>
      <p class="text-stone-400">({{ urlToShow }})</p>
    </a>
    <div class="flex gap-2">
      <p class="text-xs text-stone-400">score: {{ item.score }},</p>
      <p class="text-xs text-stone-400">by: {{ item.by }}</p>
      <p class="text-xs text-stone-400">
        comments: {{ item.kids?.length ?? 0 }}
      </p>
    </div>
  </div>
</template>
