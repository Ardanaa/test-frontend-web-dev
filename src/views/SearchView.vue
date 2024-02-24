<template>
    <v-container>
      <v-row>
        <v-col sm="4" v-for="article in searchResults" :key="article.title">
          <CardB
          class="h-full"
          v-bind="formatNews(article)"
          @click="handleNewsClick(article)"
        />
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useNewsStore } from '../store/News';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import saveReadNews from '../utils/localStorage'
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

const handleNewsClick = (news) => {
  saveReadNews(news);
}

onMounted(() => {
  // Initialize searchResults with the initial data
  searchResults.value = newsStore.searchResults;
});

onBeforeRouteUpdate((to, from, next) => {
  // Watch for changes in the route params and update the search results
  newsStore.searchNews(to.params.query);
  searchResults.value = newsStore.searchResults;
  next();
});


const searchResults = ref(newsStore.searchResults);
</script>
