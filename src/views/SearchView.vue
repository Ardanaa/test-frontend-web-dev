<template>
    <v-container>
      <v-row>
        <v-col v-for="article in searchResults" :key="article.title">
          <CardB
          class="h-full"
          v-bind="formatNews(article)"
        />
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useNewsStore } from '../store/News';
import { useRoute } from 'vue-router';
import CardB from '../components/Card/B.vue';

const route = useRoute();
const newsStore = useNewsStore();

const formatNews = (news) => ({
  description: news.url,
  image: news.urlToImage || 'https://www.uptownprinters.ca/assets/no_image_placeholder.png',
  source: news.source.name,
  title: news.title,
  href: news.url,
})

onMounted(() => {
  // Initialize searchResults with the initial data
  searchResults.value = newsStore.searchResults;

  // Watch for changes in the route params and update the search results
  watch(
    () => route.params.query,
    (newQuery) => {
      newsStore.searchNews(newQuery);
      searchResults.value = newsStore.searchResults;
    }
  );
});


const searchResults = ref(newsStore.searchResults);
</script>
