import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'

//引入初始化样式文件
import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

//定义全局指令（必须在 mount 之前）
app.directive('img-lazy', {
  mounted(el, binding) {
    // el: 指令绑定的元素 img
    // binding.value: 图片 url
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = binding.value
        stop()
      }
    })
  },
})

app.mount('#app')
