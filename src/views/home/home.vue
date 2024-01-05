<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
    <div class="search-bar" v-show="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home'
  }
</script>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import HomeCategories from "./cpns/home-categories.vue"
import HomeContent from "./cpns/home-content.vue"
import useHomeStore from "../../stores/modules/home.js";
import useScroll from "@/hooks/useScroll";
import { computed, onActivated, onMounted, onUnmounted, ref, watch } from "vue";

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchHomeCategories()
homeStore.fetchHomeHouseList()
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef)

const isShowSearchBar = computed(() => {
  return scrollTop.value > 300
})

watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHomeHouseList().then(() => {
      isReachBottom.value = false
    })
  }
})

onActivated(() => {
  homeRef.value.scrollTo({
    top: scrollTop.value
  });
})




</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
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
