import request from "../request";

export function getHomeHotSuggests() {
  return request.get({
    url: '/home/hotSuggests'
  })
}