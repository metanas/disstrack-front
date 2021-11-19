<template lang="pug">
.container.mx-auto.flex.justify-center.flex-col.items-center
  VideoCard.mb-3(:video="video" v-for="(video, i) in items" :key="i" :direction="i % 2 === 0 ? 'rtl': 'ltr'")
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import VideoCard from "../components/VideoCard.vue";
import GET_VIDEO from "../graphql/videos/get.graphql";

const $apollo = getCurrentInstance()?.appContext.config.globalProperties.$apolloProvider.defaultClient;
const items = ref([]);

onMounted(async () => {
  const { data: { getVideos } } = await $apollo.query({ query: GET_VIDEO });
  items.value = getVideos;
})
</script>

