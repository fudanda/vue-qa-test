import Bgvideo from './index.vue'

const bgvideo = {
  install: function (Vue) {
    Vue.component('bgvideo', Bgvideo)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(bgvideo)
}
export default bgvideo
