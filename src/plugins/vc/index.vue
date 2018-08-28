<template>
<div class="vue-canvas" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: -1;"></div>
</template>
<script>
import CanvasNest from 'canvas-nest.js';
export default {
  props: {
    //  color: {
    //   type: String,
    //   default: '31,237,227'
    // },
    // opacity: {
    //   type: Number,
    //   default: 1
    // },
    // count: {
    //   type: Number,
    //   default: 99
    // },
    config: {
      type: Object,
      default () {
        return {
          color: '31,237,227',
          opacity: 1,
          count:  99,
        }
      }
    }
  },
  data() {
    return {
      cn: ''
    }
  },
  mounted() {
    const el = document.querySelector('.vue-canvas')
    this.cn = new CanvasNest(el, this.config)
    console.log(this.cn)
  },
  beforeDestroy() {
    this.cn.destroy()
  }
}
</script>
