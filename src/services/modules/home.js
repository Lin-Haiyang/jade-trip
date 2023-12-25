import request from "../request";

// 获取热门推荐
export function getHomeHotSuggests() {
  return request.get({
    url: '/home/hotSuggests'
  })
}

// 获取分类
export function getHomeCategories() {
  return request.get({
    url: '/home/categories'
  })
}

// 获取房屋列表数据
export function getHomeHouseList(currentPage) {
  return request.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}