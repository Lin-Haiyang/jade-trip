import { defineStore } from 'pinia'
import { getCityAll } from '@/services'

const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {}, // 所有城市信息
    currentCity: { // 当前城市
      cityName: "广州" 
    }
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll();
      this.allCities = res.data
    }
  }
})

export default useCityStore;