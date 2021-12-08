<template lang="pug">
#sidebar
  .container.mx-auto.h-full.flex.items-center.justify-between
    router-link(to="/")
      img(src="../assets/logo.svg")
    nav.flex.items-center
      .mr-4 Categories
      .mr-4 Community
      Button.bg-purple-800 Join Now

</template>

<script lang="ts" setup>
import Button from "./Button.vue";
</script>
<style lang="scss">
#sidebar {
  @apply bg-white fixed z-50 w-full top-0 left-0 right-0;
  height: 72px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
