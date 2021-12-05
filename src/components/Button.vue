<template lang="pug">
button.btn
  slot
</template>

<script lang="ts" setup></script>
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
  ease-in;
}
</style>
