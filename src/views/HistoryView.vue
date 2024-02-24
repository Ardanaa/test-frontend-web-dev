<template>
  <div class="pa-6">
    <h1 class="text-3xl font-bold mb-8">History</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 flex-row-reverse">
      <div v-for="(news, index) in newsItems" :key="index" class="card bg-white shadow-lg rounded-lg overflow-hidden" >
        <CardA
          class="h-full"
          v-bind="formatNews(news)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardA from '../components/Card/A.vue'
import { formatPublishedAt } from '../helpers/dateHelper'

const newsItems = ref({});
console.log(newsItems.value);

const formatNews = (news) => ({
  description: news.url,
  image: news.urlToImage || 'https://www.uptownprinters.ca/assets/no_image_placeholder.png',
  title: news.title,
  href: news.url,
})

onMounted(() => {
  try {
    const storedNewsItems = localStorage.getItem('readNews');

    if (storedNewsItems) {
      const parsedNewsItems = JSON.parse(storedNewsItems);

      newsItems.value = parsedNewsItems;
      newsItems.value = newsItems.value.flat().reverse();
    }
  } catch (error) {
    console.error('Error while parsing JSON data from local storage:', error);
  }
})

</script>
