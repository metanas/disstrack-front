<template lang="pug">
router-link.w-full.mb-4.px-2(class='sm:w-1/2 md:w-1/3' :to="`/track_list/${item.id}`")
  .relative.bg-white.rounded.border
    picture.block.bg-gray-200.border-b
      img.block(src='https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&text=Card' alt='Card 1')
    .content-track-list
      font-awesome-icon(:icon="faMap") Public
      h3.text-2xl.font-bold.mt-4.flex-grow
        a.stretched-link(:title='item.title') {{ item.title }}
      .flex.items-center
        avatar(:size="40" :name="item.title" :square="false")
        .ml-3
          .owner Warn
          time.block.text-sm.text-gray-600 {{ new Date(parseInt(item.created_at)).toLocaleDateString() }}
</template>

<script lang="ts" setup>
import { faMap } from "@fortawesome/free-regular-svg-icons/faMap";
import Avatar from "./Avatar.vue";

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
}
</style>
