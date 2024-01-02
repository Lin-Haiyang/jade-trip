<template>
  <router-view />
  <tab-bar v-if="!$route.meta.hideTabBar" />
  <loading />
</template>

<script setup>
import TabBar from "./components/tab-bar/tab-bar.vue";
import Loading from "./components/loading/loading.vue";
</script>

<style lang="less" scoped>

</style>
