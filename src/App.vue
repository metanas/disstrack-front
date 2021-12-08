<template lang="pug">
Sidebar
.wrapper.h-full
  router-view
</template>

<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
import Sidebar from "./components/Sidebar.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .wrapper {
    padding-top: 72px;
  }
}
</style>
