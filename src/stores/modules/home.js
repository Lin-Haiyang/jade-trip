import { defineStore } from "pinia";
import { getHomeHotSuggests, getHomeCategories, getHomeHouseList } from "@/services";


const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houseList: [],
    currentPage: 1
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchHomeCategories() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHomeHouseList() {
      const res = await getHomeHouseList(this.currentPage)
      this.currentPage++
      this.houseList.push(...res.data)
    }
  }
})

export default useHomeStore;