<template>
  <div class="w-full h-full">
    <v-col cols="12" class="h-full px-0">
      <v-card
        class="h-full"
        color="indigo-darken-1"
        variant="tonal"
        :href="href"
        target="_blank"
      >
        <div class="d-flex align-center h-full">
          <v-col :cols="image ? 8 : 12">
            <v-chip variant="flat">
              {{ source }}
            </v-chip>
            <v-card-title v-if="title"> {{ title }} </v-card-title>
            <v-card-subtitle>
              {{ author ? `${author} - ${datePublished}` : `${datePublished}` }}
            </v-card-subtitle>
          </v-col>

          <v-col v-if="image" cols="4">
            <v-img
              :aspect-ratio="1"
              cover
              :src="image"
              class="rounded-md"
            ></v-img>
          </v-col>
        </div>
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
defineProps({
  author: {
    type: String,
    default: "No author available",
  },
  description: {
    type: String,
    default: "No description available",
  },
  datePublished: {
    type: String,
    class: "font-bold",
    default: "'No date available'",
  },
  href: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x200",
  },
  source: {
    type: String,
    default: "Unknown source",
  },
  title: {
    type: String,
    default: "No title available",
  },
})
</script>
