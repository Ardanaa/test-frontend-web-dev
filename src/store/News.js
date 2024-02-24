// src/stores/newsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { apiKey } from '../config';

export const useNewsStore = defineStore({
  id: 'news',
  state: () => ({
    articlesUS: [],
    articlesID: [],
    searchArticle: [],
  }),
  actions: {
    async fetchHeadlineNews(country) {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            apiKey,
            country,
          },
        });

        if (country === 'us') {
          this.articlesUS = response.data.articles;
        } else if (country === 'id') {
          this.articlesID = response.data.articles;
        }

      } catch (error) {
        console.error(`Error fetching news for ${country}:`, error);
      }
    },
    async searchNews(query) {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            apiKey,
            q: query,
            pageSize: 10,
          },
        });
        console.log('search',response.data)

        this.searchArticle = response.data.articles;
      } catch (error) {
        console.error(`Error searching news for ${query}:`, error);
      } 
    },
  },
  getters: {
    firstNewsUS: (state) => state.articlesUS[0] || null,
    restNewsUS: (state) => state.articlesUS.slice(1, 5),
    firstNewsID: (state) => state.articlesID[0] || null,
    restNewsID: (state) => state.articlesID.slice(1, 5),
    searchResults: (state) => state.searchArticle,
  },
});
