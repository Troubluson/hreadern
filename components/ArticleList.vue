<script setup lang="ts">
const STORY_TYPES = ["top", "best", "new"];

const route = useRoute();
const router = useRouter();
const page = ref(route.query.page ? route.query.page : "");

watch(page, (page, _previous) => {
  router.push({
    path: "/",
    query: { page },
  });
});

const setPage = () => {
  const currentPage = page.value.toString();
  const pageUncertain = parseInt(currentPage);
  const newPage = !Number.isNaN(pageUncertain) ? pageUncertain + 1 : 1;
  page.value = newPage.toString();
};

const sortBy = ref(STORY_TYPES[0]);
const fetchUrl = computed(() => `/api/list/${sortBy.value}`);
const setSortBy = (newIndex: string) => (sortBy.value = newIndex);
const { data: storyIds, pending } = await useFetch<number[]>(fetchUrl, {
  watch: [sortBy, page],
  query: { page: page },
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
          class="button"
        >
          Top
        </button>
        <button
          @click="setSortBy('best')"
          type="button"
          :class="{ 'border rounded border-emerald-700': sortBy === 'best' }"
          class="button"
        >
          Best
        </button>
        <button
          @click="setSortBy('new')"
          type="button"
          :class="{ 'border rounded border-emerald-700': sortBy === 'new' }"
          class="button"
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
      <button @click="setPage()" class="text-white bg-slate-600">+1</button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.button {
  @apply inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out;
  &:hover {
    @apply border-zinc-300;
  }
  &:focus {
    @apply outline-none ring-0;
  }
}
</style>
