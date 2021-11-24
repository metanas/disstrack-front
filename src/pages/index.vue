<template lang="pug">
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
            label.flex.flex-col.rounded-lg.border-4.border-dashed.w-full.h-60.p-10.group.text-center
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
              input.hidden(type='file')
        p.text-sm.text-gray-300
          span File type: png, jpg, jpeg, types of images
        .form-group
          label Visibility
          .flex
            label.inline-flex.items-center.mt-3
              input.form-radio.h-5.w-5.text-blue-600(type='radio' name="visibility" :checked="item.visibility==='public'" @click="item.visibility='public'")
              span.ml-2.text-gray-700 Public
            label.inline-flex.items-center.mt-3.ml-3
              input.form-radio.h-5.w-5.text-blue-600(type='radio' name="visibility" :checked="item.visibility==='private'" @click="item.visibility='private'")
              span.ml-2.text-gray-700 Private
        div
          button.my-5.w-full.flex.justify-center.bg-blue-500.text-gray-100.p-4.rounded-full.tracking-wide.font-semibold.shadow-lg.cursor-pointer.transition.ease-in.duration-300(type='submit' class='focus:outline-none focus:shadow-outline hover:bg-blue-600')
            | Upload
  .flex.justify-between.mt-4
    h1.text-lg Track Time line Lists
    button.btn.bg-blue-600.text-white(@click="display = true") New Track list
  .flex.flex-row.flex-wrap.-mx-2.mt-6
    router-link.w-full.mb-4.px-2(class='sm:w-1/2 md:w-1/3' v-for="item in items" :key="item.id" :to="`/track_list/${item.id}`")
      .relative.bg-white.rounded.border
        picture.block.bg-gray-200.border-b
          img.block(src='https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&text=Card' alt='Card 1')
        .p-4
          h3.text-lg.font-bold
            a.stretched-link(:title='item.title') {{ item.title }}
          time.block.mb-2.text-sm.text-gray-600 {{ new Date(parseInt(item.created_at)).toLocaleDateString() }}
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import GET_TRACK_LIST from "../graphql/track_list/gets.graphql";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import ADD_TRACK_LIST from "../graphql/track_list/add.graphql";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
const faTimesCp = computed(() => faTimes);

const display = ref(false);

const item = ref({
  title: "",
  visibility: "public",
});

const { result, refetch } = useQuery(GET_TRACK_LIST);
const { mutate: addTrackList } = useMutation(ADD_TRACK_LIST);

const items = useResult(result, []);

function newItem() {
  addTrackList(item.value).then(({ data: { addTrackList } }) => {
    refetch();
    display.value = false;
  });
}
</script>
