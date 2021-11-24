<template lang="pug">
.time-line.relative
  .line
  .prop.flex(v-for="(item, i) in items" :key="i" :class="`justify-${item.position}`")
    slot(:item="item" name="item")
</template>

<script lang="ts" setup>
const props = defineProps<{ items: [] }>();

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
}
</style>
