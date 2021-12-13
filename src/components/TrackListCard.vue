<template lang="pug">
router-link.w-full.mb-4.px-2(class='sm:w-1/2 md:w-1/3' :to="`/track_list/${item.id}`")
  .relative.bg-white.rounded.border
    picture.block.bg-gray-200.border-b
      img.block(:src='`${BASE_URL}/images/${item.cover_url}`' alt='Card 1')
    .content-track-list
      .flex.items-center
        font-awesome-icon(:icon="faGlobe")
        .ml-2.uppercase {{ item.visibility }}
      h3.text-2xl.font-bold.mt-4.flex-grow
        a.stretched-link(:title='item.title') {{ item.title }}
      .flex.items-center
        img.avatar-img(:src="item.owner.picture" v-if="item.owner.picture")
        avatar(:size="40" :name="item.owner.id" :square="false" v-else)
        .ml-3
          .owner {{ item.owner.first_name }} {{ item.owner.last_name }}
          time.block.text-sm.text-gray-600 {{ new Date(parseInt(item.created_at)).toLocaleDateString() }}
</template>

<script lang="ts" setup>
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import Avatar from "./Avatar.vue";
import { computed } from "vue";

const BASE_URL = computed(() => import.meta.env.VITE_BASE_URL);

const props = defineProps<{
  item: Record<string, string>;
}>();
</script>
<style lang="scss" scoped>
picture {
  img {
    aspect-ratio: 16 / 9;
  }
}

.content-track-list {
  @apply flex flex-col;
  height: 177px;
  padding: 16px 16px 20px 16px;

  .avatar-img {
    border-radius: 50%;
    border: 1px solid #868e96;
    object-fit: scale-down;
    width: 40px;
    height: 40px;
  }
}
</style>
