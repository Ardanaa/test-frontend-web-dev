<template>
  <v-toolbar dense>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>News</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="search"
      label="Search News"
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
    ></v-text-field>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { formatPublishedAt } from '../../helpers/dateHelper'
import { apiKey } from '../../config'

const search = ref('');
const isLoading = ref(true);
const articles = ref([]);

const filteredNews = computed(() => {
  return articles.value.filter(news =>
    news.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const formatNews = (news) => ({
  author: news.author,
  description: news.description,
  datePublished: formatPublishedAt(news.publishedAt),
  image: news.urlToImage || 'https://www.uptownprinters.ca/assets/no_image_placeholder.png',
  source: news.source.name,
  title: news.title,
  href: news.url,
});

const fetchNews = async (query = null) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        apiKey,
        q: query,
      },
    });

    articles.value = response.data.articles;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

fetchNews(); // Initial fetch without a query

</script>
