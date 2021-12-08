<template lang="pug">
.video-card
  .video-cover
    picture
      img(:src="video.thumbnails_high")
  .video-information
    .title {{ video.title }}
    .view-count {{ video.view_count.toLocaleString() }} Views
    .channel-information
      picture
        img(:src="video.channel.image_default")
      .channel-name
        .truncate {{ video.channel.title }}
        .subscribers(v-if="video.channel.subscribers") {{ toNumberCase(video.channel.subscribers) }} Subscribers
</template>

<script lang="ts" setup>
import toNumberCase from "../filters/toNumberCase";
import { computed } from "vue";

const props = defineProps<{
  video: Record<string, string>;
}>();
</script>

<style lang="scss" scoped>
.video-card {
  display: flex;
  height: 106px;
  max-width: 460px;
  min-width: 460px;
  background: #ffffff;
  box-shadow: 0 0 1px 0 rgba(10, 31, 68, 0.08),
    0 8px 10px 0 rgba(10, 31, 68, 0.1);
  border-radius: 4px;

  &[dir="rtl"] {
    text-align: right;

    .video-cover {
      img {
        border-radius: 0 4px 4px 0;
      }
    }

    .video-information {
      border-left: 0;
      border-right: 1px solid gray;
      padding-bottom: 8px;

      .title {
        unicode-bidi: plaintext;
      }

      .view-count {
        unicode-bidi: plaintext;
      }

      .subscribers {
        unicode-bidi: plaintext;
      }
    }

    .channel-information {
      img {
        margin-right: 0 !important;
        margin-left: 8px;
      }
    }

    .video-upload-at {
      border-radius: 4px 0 0 4px;
      unicode-bidi: plaintext;
    }
  }

  .video-cover {
    min-width: 188px;
    max-width: 188px;

    img {
      width: 100%;
      height: 100%;
      background-color: #000;
      object-fit: scale-down;
      aspect-ratio: 16 / 9;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }
  }

  .video-information {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid gray;
    padding: 8px;

    .title {
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .view-count {
      color: #868e96;
      flex-grow: 1;
      font-size: 12px;
    }

    .channel-information {
      display: flex;
      align-items: center;
      font-size: 8px;
      font-weight: bold;

      .subscribers {
        font-weight: 400;
      }

      img {
        height: 20px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        margin-right: 8px;
        border: 1px solid #f1f2f4;
      }
    }
  }

  .video-upload-at {
    background-color: #2274a5;
    color: white;
    font-size: 10px;
    font-weight: bold;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    text-align: center;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    line-height: 12px;
    padding: 6px;
  }
}

@media (max-width: 600px) {
  .video-card {
    flex-direction: column;
    max-width: 100%;
    min-width: 100%;
    height: auto;

    .video-cover {
      min-width: 100%;
      max-width: 100%;

      img {
        border-radius: 4px 4px 0 0 !important;
      }
    }
  }

  .video-upload-at {
    border-radius: 0 0 4px 4px !important;
    writing-mode: unset !important;
    text-orientation: unset !important;
  }
}
</style>
