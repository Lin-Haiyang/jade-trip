import { ref, onMounted, onUnmounted } from "vue";
import { throttle } from 'underscore'

const useScroll = (elRef) => {
  let el = window;
  // 是否到达底部
  const isReachBottom = ref(false);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight; // 当前元素可视区域高度
      scrollTop.value = document.documentElement.scrollTop; // 当前元素滚出可视区域的距离
      scrollHeight.value = document.documentElement.scrollHeight; // 当前元素高度（包括超出可视区域的高度）
    } else {
      clientHeight.value = el.clientHeight; // 当前元素可视区域高度
      scrollTop.value = el.scrollTop; // 当前元素滚出可视区域的距离
      scrollHeight.value = el.scrollHeight; // 当前元素高度（包括超出可视区域的高度）
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)
  
  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener('scroll', scrollListenerHandler)
  })
  
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}

export default useScroll