<template>
  <RouterView />
  <tab-bar v-if="!$route.meta.hideTabBar" />
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
</script>

<style lang="less" scoped>

</style>
