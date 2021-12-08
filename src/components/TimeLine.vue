<template lang="pug">
.time-line.relative
  .prop.flex.items-center(v-for="(item, i) in items" :key="i")
    .time-content
      .video-upload-at.text-center {{ new Date(parseInt(item.video.published_at)).toLocaleDateString("fr-FR") }}
      .video-upload-time.text-center {{ new Date(parseInt(item.video.published_at)).toLocaleTimeString("fr-FR") }}
    .line
      .br-line
      .icon-center
      .horizontal-line
    slot(:item="item" name="item")
</template>

<script lang="ts" setup>
const props = defineProps<{ items: [] }>();
</script>

<style lang="scss">
.time-line {
  .time-content {
    background: #f4f4f5;
    border-radius: 999px;
    padding: 5px 16px;
    color: #6b7280;
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
  }

  .line {
    position: relative;
    margin-left: 16px;
    height: 126px;
    width: 115px;

    .horizontal-line {
      width: 100%;
      border-top: 2px dashed #dfe6e9;
      position: absolute;
      top: 52%;
    }

    .icon-center {
      border: #4338ca solid 3px;
      padding: 6px;
      background: white;
      border-radius: 50%;
      position: absolute;
      left: -8px;
      top: 57px;
      z-index: 1;
    }

    .br-line {
      height: 100%;
      border-left: 2px solid #dfe6e9;
    }
  }
}
</style>
