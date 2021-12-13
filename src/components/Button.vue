<template lang="pug">
button.btn
  font-awesome-icon.mr-3(:icon="icon" v-if="icon")
  slot
</template>

<script lang="ts" setup>
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

defineProps<{
  icon?: IconDefinition;
}>();
</script>
<style lang="scss">
.btn {
  @apply flex
  items-center
  justify-center
  focus:outline-none
  text-white text-sm
  sm:text-base
  rounded-2xl
  py-2
  px-5
  transition
  duration-150
  ease-in
  shadow;
}
</style>
