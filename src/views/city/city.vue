<template>
  <div class="city">
    <div class="top">
      <van-search
        v-model="inputValue"
        show-action
        clearable
        shape="round"
        placeholder="城市/区域/位置"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs v-model:active="currentTab" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
      <div class="content">
        <template v-for="(value, key, index) in allCities" :key="index">
          <city-group v-show="currentTab === key" :group-data="value" />
        </template>
      </div>
      <!-- <city-group :group-data="currentCities" /> -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCityStore from '@/stores/modules/city'
import CityGroup from './cpns/city-group.vue'

const router = useRouter();

const inputValue = ref('');

const onSearch = () => {
  console.log('onSearch')
}

const onCancel = () => {
  router.back();
}

const currentTab = ref();

const cityStore = useCityStore();

const { allCities } = storeToRefs(cityStore);
cityStore.fetchAllCitiesData()

const indexList = computed(() => {
  const list = allCities.value?.cityGroup?.cities.map(item => item.group);
  list?.unshift("#")
  return list
})

const currentCities = computed(() => {
  return allCities.value[currentTab.value]
})

</script>

<style lang="less" scoped>
.city {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
  overflow-y: auto;
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

</style>
