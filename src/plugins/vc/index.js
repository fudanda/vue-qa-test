import Vc from './index.vue'

const vc = {
  install: function (Vue) {
    Vue.component('vue-canbg', Vc)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vc)
}
export default vc
