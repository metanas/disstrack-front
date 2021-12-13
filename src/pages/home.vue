<template lang="pug">
.banner.relative
  img.w-full(src="../assets/bg.png")
  .banner-title.absolute.z-10.text-4xl.text-white.font-bold(class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2") Timeline
.container.mx-auto
  .fixed.text-gray-500.flex.items-center.justify-center.overflow-auto.z-50.bg-black.bg-opacity-40.left-0.right-0.top-0.bottom-0(v-if="display")
    .w-full.p-10.bg-white.rounded-xl.z-10.relative(class='sm:max-w-lg')
      font-awesome-icon.absolute.right-8.top-8.cursor-pointer(:icon="faTimesCp" @click="display = false")
      .text-center
        h2.mt-5.text-3xl.font-bold.text-gray-900
          | Add New Track List!
        p.mt-2.text-sm.text-gray-400 Create your Dis-track list and share with your friends
      form.mt-8.space-y-3(@submit.prevent="newItem")
        .grid.grid-cols-1.space-y-2
          label.text-sm.font-bold.text-gray-500.tracking-wide Title
          input.text-base.p-2.border.border-gray-300.rounded-lg(class='focus:outline-none focus:border-indigo-500' v-model="item.title" placeholder='Bigg vs Muslim')
        .grid.grid-cols-1.space-y-2
          label.text-sm.font-bold.text-gray-500.tracking-wide Cover Image
          .flex.items-center.justify-center.w-full
            img(:src="preview" v-if="preview")
            label.flex.flex-col.rounded-lg.border-4.border-dashed.w-full.h-60.p-10.group.text-center(v-else)
              .h-full.w-full.text-center.flex.flex-col.items-center.justify-center.items-center
                .flex.flex-auto.max-h-48.mx-auto.-mt-10(class='w-2/5')
                  img.has-mask.h-36.object-center(src='https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg' alt='freepik image')
                p.pointer-none.text-gray-500
                  span.text-sm Drag and drop
                  |  files here
                  br
                  |  or
                  a.text-blue-600.ml-1( class='hover:underline') select a file
                  |  from your computer
              input.hidden(type='file' @input="addFile" accept=".png, .jpeg, .jpg")
        p.text-sm.text-gray-300
          span File type: png, jpg, jpeg, types of images
        .form-group
          label Visibility
          .flex
            label.inline-flex.items-center.mt-3
              input.form-radio.h-5.w-5.text-purple-800(type='radio' name="visibility" :checked="item.visibility==='public'" @click="item.visibility='public'")
              span.ml-2.text-gray-700 Public
            label.inline-flex.items-center.mt-3.ml-3
              input.form-radio.h-5.w-5.text-purple-800(type='radio' name="visibility" :checked="item.visibility==='private'" @click="item.visibility='private'")
              span.ml-2.text-gray-700 Private
        div
          button.my-5.w-full.flex.justify-center.bg-purple-800.text-gray-100.p-4.rounded-full.tracking-wide.font-semibold.shadow-lg.cursor-pointer.transition.ease-in.duration-300(type='submit' class='focus:outline-none focus:shadow-outline hover:bg-blue-600')
            | Upload
  .flex.justify-between.mt-4.items-center
    h1.text-lg Featured Timelines
    button.btn.bg-purple-800.text-white(@click="display = true" v-if="store.getters.isAuth") New Track list
  .flex.flex-row.flex-wrap.-mx-2.mt-6
    track-list-card(v-for="item in items" :key="item.id" :item="item")
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import GET_TRACK_LIST from "../graphql/track_list/gets.graphql";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import ADD_TRACK_LIST from "../graphql/track_list/add.graphql";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import TrackListCard from "../components/TrackListCard.vue";
import { useStore } from "vuex";

const faTimesCp = computed(() => faTimes);

const display = ref(false);
const store = useStore();

const item = ref<{
  title: string;
  visibility: string;
  file: File | null;
}>({
  title: "",
  visibility: "public",
  file: null,
});

const preview = ref("");

const { result, refetch } = useQuery(GET_TRACK_LIST);
const { mutate: addTrackList } = useMutation(ADD_TRACK_LIST);

const items = useResult(result, []);

function addFile(event): void {
  item.value.file = event.target.files[0];
  preview.value = URL.createObjectURL(item.value.file);
}

function newItem() {
  addTrackList(item.value).then(({ data: { addTrackList } }) => {
    refetch();
    display.value = false;
  });
}
</script>
