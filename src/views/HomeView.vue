<template>
  <main class="pa-9">
    <!-- start: headline US -->
    <div class="text-xl font-sans font font-bold mb-2">Top Headline in US</div>
    <!-- start: skeleton loading -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 grid-rows-2 gap-2 md:grid-cols-3"
    >
      <div class="col-span-1 row-span-2">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article, list-item-two-line"
        />
      </div>
      <div v-for="i in 4" :key="i" class="col-span-1 row-span-1">
        <v-skeleton-loader class="mx-auto border" type="article" />
      </div>
    </div>
    <!-- end: skeleton loading -->

    <div v-else class="grid grid-cols-1 grid-rows-2 gap-2 md:grid-cols-3">
      <div class="col-span-1 row-span-2">
        <CardA
          class="h-full"
          v-bind="formatNews(newsStore.firstNewsUS)"
          @click="handleNewsClick(newsStore.firstNewsUS)"
        />
      </div>
      <div
        v-for="(news, index) in newsStore.restNewsUS"
        :key="index"
        class="col-span-1 row-span-1"
      >
        <CardB
          class="flex"
          v-bind="formatNews(news)"
          @click="handleNewsClick(news)"
        />
      </div>
    </div>
    <!-- end: headline US -->

    <!-- start: headline ID -->
    <div class="text-xl font-sans font font-bold mt-10 mb-2">
      Top Headline in Indonesia
    </div>
    <div
      v-if="isLoading"
      class="grid md:grid-rows-2 md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-2"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="col-span-1 row-span-1 order-last md:order-first"
      >
        <v-skeleton-loader class="mx-auto border" type="article" />
      </div>
      <div class="col-span-1 row-span-2 md:order-last">
        <v-skeleton-loader
          class="mx-auto border"
          type="image, article, list-item-two-line"
        />
      </div>
    </div>

    <div
      v-else
      class="grid md:grid-rows-2 md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-2"
    >
      <div
        v-for="(news, index) in newsStore.restNewsID"
        :key="index"
        class="col-span-1 row-span-1 order-last md:order-first"
      >
        <CardB
          class="flex"
          v-bind="formatNews(news)"
          @click="handleNewsClick(news)"
        />
      </div>
      <div class="col-span-1 row-span-2 md:order-last">
        <CardA
          class="h-full"
          v-bind="formatNews(newsStore.firstNewsID)"
          @click="handleNewsClick(firstNewsID)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import CardA from "../components/Card/A.vue"
import CardB from "../components/Card/B.vue"
import { ref, onMounted } from "vue"
import { formatPublishedAt } from "../helpers/dateHelper"
import saveReadNews from "../utils/localStorage"
import { useNewsStore } from "../store/News"

const newsStore = useNewsStore()
const isLoading = ref(true)

console.log(newsStore.articlesUS)
const handleNewsClick = (news) => {
  // Save the clicked news to local storage
  saveReadNews(news)
}

const formatNews = (news) => ({
  author: news.author,
  description: news.description,
  datePublished: formatPublishedAt(news.publishedAt),
  image:
    news.urlToImage ||
    "https://www.uptownprinters.ca/assets/no_image_placeholder.png",
  source: news.source.name,
  title: news.title,
  href: news.url,
})

onMounted(() => {
  newsStore.fetchHeadlineNews("us")
  newsStore.fetchHeadlineNews("id")
  isLoading.value = false // Set isLoading to false after fetching news
})
</script>
