<template lang="pug">
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
          button.my-5.w-full.flex.justify-center.bg-blue-500.text-gray-100.p-4.rounded-full.tracking-wide.font-semibold.shadow-lg.cursor-pointer.transition.ease-in.duration-300(type='submit' class='focus:outline-none focus:shadow-outline hover:bg-blue-600')
            | Upload
  .flex.justify-between.items-center
    h1.text-3xl {{ track_list.title }}
    button.btn.bg-blue-600.text-white(@click="display = true") New Track
  .mt-6(v-if="!loading")
    TimeLine(:items="track_list_videos" )
      template(v-slot:item="{ item }")
        VideoCard(:key="item.id" :video="item.video" :direction="getPosition(item.position)" class="mb-3" )
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import GET_TRACK_LIST from "../../graphql/track_list/get.graphql";
import GET_TRACK_LIST_VIDEOS from "../../graphql/track_list_videos/gets.graphql";
import NEW_VIDEO_TRACK_LIST from "../../graphql/track_list/new.graphql";
import ADD_VIDEO from "../../graphql/videos/add.graphql";
import VideoCard from "../../components/VideoCard.vue";
import TimeLine from "../../components/TimeLine.vue";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
const {
  result: track_list_result,
  refetch,
  loading,
} = useQuery(GET_TRACK_LIST_VIDEOS, {
  id: props.id,
});

const track_list = useResult(result, {}, (data) => data.getTrackList);
const track_list_videos = useResult(
  track_list_result,
  {},
  (data) => data.getTrackListVideos
);

function getPosition(position: string) {
  return position === "end" ? "rtl" : "ltr";
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
}
</script>
