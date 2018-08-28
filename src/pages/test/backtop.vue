<template>
  <q-page padding class="row justify-center">
<transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
      >
        <q-alert
          v-if="visible"
          color="secondary"
          icon="cloud"
          appear
          :actions="[{ label: 'Dismiss', handler: () => { visible = false } }]"
          class="q-mb-sm"
        >
          Lorem ipsum dolor sit amet.
        </q-alert>
      </transition>
  </q-page>
</template>

<style lang="stylus">

</style>
<script>
export default {
  data: function(){
   return {
        show:false,
        visible: true,
    }
},
mounted () {
    document.addEventListener('click', this.handleBodyClick)
},
methods:{
    handleBodyClick: function(){
      const pageX=document.body.scrollLeft||document.documentElement.scrollLeft+event.clientX
      const pageY=document.body.scrollTop||document.documentElement.scrollTop+event.clientY
      console.log(pageX,pageY)
    },
     handler () {
      this.loading = true
      // 我们在这里模拟一个延迟：
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
   
}
}
</script>
