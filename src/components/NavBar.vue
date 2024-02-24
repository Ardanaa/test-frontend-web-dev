<template>
	<v-card>
		<v-toolbar color="indigo">
			<v-toolbar-title class="font-bold text-2xl">
				<v-btn to="/">News</v-btn>
			</v-toolbar-title>

			<v-text-field
				class="mt-5 py-2"
				density="compact"
				append-inner-icon="mdi-magnify"
				v-model="search"
				variant="solo-filled"
				label="Search News"
				@input="handleSearch($event)"
				@keyup.enter="handleEnter"
			>
			</v-text-field>
			<v-spacer />

			<v-toolbar-items>
				<v-btn v-for="item in menuItems" :key="item.title" :to="item.path">
					{{ item.title }}
				</v-btn>
			</v-toolbar-items>

		</v-toolbar>
	</v-card>
  <v-snackbar v-model="showAlert" :timeout="3000">
    Tulis yang mau dicari dulu ya!
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useNewsStore } from "../store/News";
import { debounce } from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
const showAlert = ref(false);
const search = ref("");
const menuItems = ref([
	{ title: "History", path: "/history", icon: "history" },
]);

const newsStore = useNewsStore();

// Debounce the handleSearch function
const debouncedHandleSearch = debounce((query) => {
	console.log("Searching for:", query);
	newsStore.searchNews(query);
}, 500);

const handleSearch = (event) => {
	debouncedHandleSearch(event.target.value);
};

const handleEnter = () => {
	if (search.value.trim() === "") {
		showAlert.value = true;
    // setTimeout(() => {
    //   showAlert.value = false;
    // }, 3000)
	} else {
		router.push({ name: "SearchResults", params: { query: search.value } });
	}
};
</script>
