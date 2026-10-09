//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令绑定的元素 img
        // binding.value: 图片 url
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            // 进入视口加载后停止监听，避免重复触发
            stop()
          }
        })
      },
    })
  },
}
