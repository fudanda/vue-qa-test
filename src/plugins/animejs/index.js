import Anime from './index.vue'

const anime = {
  install: function (Vue) {
    Vue.component('vanime', Anime)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(anime)
}
export default anime
