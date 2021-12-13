<template lang="pug">
.cover-image(v-if="!loading")
  img(:src="`${BASE_URL}/images/${track_list.cover_url}`")
  .shadow
    .container.mx-auto
      h1.text-6xl.font-bold.text-center {{ track_list.title }}
.container.mx-auto.mt-3
  .fixed.text-gray-500.flex.items-center.justify-center.overflow-auto.z-50.bg-black.bg-opacity-40.left-0.right-0.top-0.bottom-0(v-if="display")
    .w-full.p-10.bg-white.rounded-xl.z-10.relative(class='sm:max-w-lg')
      font-awesome-icon.absolute.right-8.top-8.cursor-pointer(:icon="faTimesCp" @click="display = false")
      .text-center
        h2.mt-5.text-3xl.font-bold.text-gray-900
          | Add New Track!
        //p.mt-2.text-sm.text-gray-400 Create your Dis-track list and share with your friends
      form.mt-8.space-y-3(@submit.prevent="newItem")
        .grid.grid-cols-1.space-y-2
          label.text-sm.font-bold.text-gray-500.tracking-wide Youtube Link
          input.text-base.p-2.border.border-gray-300.rounded-lg(class='focus:outline-none focus:border-indigo-500' v-model="url" type="url" placeholder='https://www.youtube.com/watch?v=xxxxxx')
        .form-group
          label Visibility
          .flex
            label.inline-flex.items-center.mt-3
              input.form-radio.h-5.w-5.text-blue-600(type='radio' name="position" :checked="position==='start'" @click="position='start'")
              span.ml-2.text-gray-700 Left
            label.inline-flex.items-center.mt-3.ml-3
              input.form-radio.h-5.w-5.text-blue-600(type='radio' name="position" :checked="position==='center'" @click="position='center'")
              span.ml-2.text-gray-700 Center
            label.inline-flex.items-center.mt-3.ml-3
              input.form-radio.h-5.w-5.text-blue-600(type='radio' name="position" :checked="position==='end'" @click="position='end'")
              span.ml-2.text-gray-700 Right
        div
          button.my-5.w-full.flex.justify-center.bg-purple-800.text-gray-100.p-3.rounded-full.tracking-wide.font-semibold.shadow-lg.cursor-pointer.transition.ease-in.duration-300(type='submit' class='focus:outline-none focus:shadow-outline hover:bg-blue-600')
            | Upload
  .flex.justify-between.items-end
  .grid.grid-cols-3.gap-4(v-if="!loading")
    .chronology.col-span-2
      .flex.justify-between.items-center.mb-6
        h1.text-2xl Chronology
        .text-blue-600(@click="display = true") New Track
      TimeLine(:items="track_list_videos")
        template(v-slot:item="{ item }")
          VideoCard(:key="item.id" :video="item.video" )
    .about
      h1.text-2xl.mb-6 About
      section.information
        .title Creation Date
        .value {{ toDate(track_list.created_at) }}
      section.information
        .title Latest Updated Date
        .value {{ toDate(track_list.updated_at) }}
      section.information
        .title Creator
        .flex.mt-2.items-center
          img.avatar-img(:src="track_list.owner.picture" v-if="track_list.owner.picture")
          Avatar(name="track_list.owner.id" :size="40" v-else)
          .ml-2 {{ track_list.owner.first_name }} {{ track_list.owner.last_name }}
      section.information
        .title Contributors
        .flex.flex-wrap
          .flex.mt-2.items-center.mr-4(v-for="i in 4" :key="i")
            Avatar(:name="`Contributor ${i}`" :size="40")
            .ml-2 Contributor {{ i }}
      section.information
        .title Videos
        .value {{ about.videos_count }}
      section.information
        .title Channels
        .value {{ about.channels_count }}
        .flex.flex-wrap.mt-3
          img.channel-image(:src="channel.image_default" :title="channel.title" v-for="channel in about.channels" :key="channel.id")
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import VideoCard from "../../components/VideoCard.vue";
import TimeLine from "../../components/TimeLine.vue";
import GET_TRACK_LIST from "../../graphql/track_list/get.graphql";
import GET_TRACK_LIST_ABOUT from "../../graphql/track_list/about.graphql";
import GET_TRACK_LIST_VIDEOS from "../../graphql/track_list_videos/gets.graphql";
import NEW_VIDEO_TRACK_LIST from "../../graphql/track_list/new.graphql";
import ADD_VIDEO from "../../graphql/videos/add.graphql";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/Avatar.vue";

const BASE_URL = computed(() => import.meta.env.VITE_BASE_URL);

const props = defineProps<{
  id: string;
}>();

const url = ref("");
const position = ref("start");
const display = ref(false);

const faTimesCp = faTimes;

const { mutate: addVideo } = useMutation(ADD_VIDEO);

const { mutate: newVideoTrackList } = useMutation(NEW_VIDEO_TRACK_LIST);

const { result } = useQuery(GET_TRACK_LIST, { id: props.id });

const { result: result_about, refetch: refetch_about } = useQuery(
  GET_TRACK_LIST_ABOUT,
  {
    id: props.id,
  },
);

const {
  result: track_list_result,
  refetch,
  loading,
} = useQuery(GET_TRACK_LIST_VIDEOS, {
  id: props.id,
});

const about = useResult(result_about, {});

const track_list = useResult(result, {}, (data) => data.getTrackList);

const track_list_videos = useResult(track_list_result, {});

function toDate(val: string): string {
  if (!val) return "N/A";
  return new Date(parseInt(val)).toLocaleString("fr-FR");
}

async function newItem() {
  const {
    data: { addVideo: video_id },
  } = await addVideo({ url: url.value });
  await newVideoTrackList({
    id: track_list.value.id,
    video_id,
    position: position.value,
  });
  url.value = "";
  display.value = false;
  await refetch();
  await refetch_about();
}
</script>
<style lang="scss">
.cover-image {
  @apply relative bg-black;

  img {
    width: 100%;
    max-height: 462px;
    object-fit: cover;
  }

  .shadow {
    @apply absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white;
    z-index: 1;
    box-shadow: inset 0 0 0 1000px rgba(28, 26, 26, 0.5);
  }
}

section.information {
  margin-bottom: 1rem;

  .title {
    font-size: 12px;
    line-height: 150%;
    color: #3f3f46;
  }

  .value {
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: #18181b;
  }

  .avatar-img {
    border-radius: 50%;
    border: 1px solid #868e96;
    object-fit: scale-down;
    width: 40px;
    height: 40px;
  }

  .channel-image {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
    border-radius: 50%;
    margin-right: 1rem;
  }
}
</style>
