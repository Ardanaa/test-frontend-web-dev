<template>
  <div class="w-full h-full py-3">
    <v-card 
    color="indigo-darken-4"
    :href="href"
    target="_blank"
    class="h-full"
    >
    <div class="relative">
      <v-img
        :aspect-ratio="16/9"
        cover
        :src="image"
      />
      <v-chip v-if="source" class="absolute top-2 left-2" variant="flat">
        {{ source }}
      </v-chip>
    </div>
    <v-card-title v-if="title"> {{ title }} </v-card-title>
    <v-card-subtitle v-if="author || datePublished"> {{ author ? `${author} - ${datePublished}` : `${datePublished}` }} </v-card-subtitle>
    <v-card-text v-if="description"> {{ description }}</v-card-text>
  </v-card>
  </div>
</template>

<script setup>
  defineProps({
    author:{
      type: String,
      default: 'No author available'
    },
    description:{
      type: String,
      default: 'No description available'
    },
    datePublished:{
      type: String,
      class: "font-bold",
      default: "'No date available'"
    },
    href: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200'
    },
    source:{
      type: String,
      default: 'Unknown source'
    },
    title:{
      type: String,
      default: 'No title available'
    }
  })

  const element = () => {
  let res = 'div'
  if (props.href) {
    res = 'a'
  }
  return res
}
</script>