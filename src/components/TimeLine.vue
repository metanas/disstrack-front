<template lang="pug">
.time-line.relative
  .line
  .prop.flex.items-center(v-for="(item, i) in items" :key="i" :class="`justify-${item.position}`")
    font-awesome-icon.mr-3(:icon="faThumbsUpCp" v-if="item.position === 'start'" size="2x")
    slot(:item="item" name="item")
    font-awesome-icon.pin(:icon="faCircleCp")
    font-awesome-icon.ml-3(:icon="faThumbsUpCp" v-if="item.position !== 'start'" size="2x")
</template>

<script lang="ts" setup>
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import { computed } from "vue";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
const props = defineProps<{ items: [] }>();

const faThumbsUpCp = computed(() => faThumbsUp);
const faCircleCp = computed(() => faCircle);

console.log(props.items);
</script>

<style lang="scss">
.time-line {
  .line {
    border-left: 3px solid #868e96;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: -1;
  }

  .prop {
    position: relative;

    .pin {
      position: absolute;
      color: #868e96;
      left: 49.399%;
      z-index: -1;
    }

    @screen xl {
      .pin {
        left: 49.6%;
      }
    }
  }
}
</style>
