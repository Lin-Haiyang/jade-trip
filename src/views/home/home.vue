<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>
  </div>
</template>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import HomeCategories from "./cpns/home-categories.vue"
import HomeContent from "./cpns/home-content.vue"
import useHomeStore from "../../stores/modules/home.js";
import useScroll from "@/hook/useScroll";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchHomeCategories()
homeStore.fetchHomeHouseList()

const { isReachBottom, scrollTop } = useScroll()

const isShowSearchBar = computed(() => {
  return scrollTop.value > 300
})

watch(isReachBottom, (newValue) => {
  console.log("🚀 ~ file: home.vue:37 ~ watch ~ isReachBottom:", isReachBottom)
  if (newValue) {
    homeStore.fetchHomeHouseList().then(() => {
      isReachBottom.value = false
    })
  }
})




</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}

</style>
