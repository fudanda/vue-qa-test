<template>
<q-layout :view="view">
  <!-- Header -->
  <!-- <vanime circlecolor="#1DC27A" :particulecolor="particulecolor" :circlenum="circlenum"></vanime> -->
  <q-layout-header v-model="header" :reveal="headerReveal">
    <!-- First row of header is a QToolbar -->

    <q-toolbar :color="radio2">

      <q-btn flat round dense @click="showLeft = !showLeft" icon="menu" />

      <q-toolbar-title>

      </q-toolbar-title>

      <q-select class="no-shadow" :options="option" v-model="lang" hide-underline inverted color="radio2" />
      <q-btn flat round dense @click="showRight = !showRight" icon="menu" />

    </q-toolbar>
    <tags-view></tags-view>



  </q-layout-header>

  <!-- Left Side Drawer -->

  <q-layout-drawer side="left" v-model="showLeft" :overlay="lao">
    <q-scroll-area class="fit">
      <q-card flat class="q-ma-sm">
        <q-card-media overlay-position="bottom">
          <img src="../statics/1.jpeg">

          <q-card-title slot="overlay">
            <q-btn-dropdown flat color="blue-2" label="admin" text-color="blue-5">
              <q-list link>
                <q-item v-close-overlay @click.native="handlerFunction">
                  <q-item-side icon="folder" inverted color="primary" />
                  <q-item-main>
                    <q-item-tile label>主题</q-item-tile>
                    <!-- <q-item-tile sublabel>February 22, 2016</q-item-tile> -->
                  </q-item-main>

                </q-item>
                <q-item-separator inset />

                <q-item v-close-overlay @click.native="handlerFunction">
                  <q-item-side icon="assignment" inverted color="secondary" />
                  <q-item-main>
                    <q-item-tile label>退出</q-item-tile>
                  </q-item-main>
                  <q-item-side right icon="info" color="amber" />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-card-title>
        </q-card-media>
      </q-card>



      <fty-menu :menu-list="menuList" :shrink="shrinkMenu"></fty-menu>
    </q-scroll-area>

  </q-layout-drawer>



  <q-layout-drawer side="right" v-model="showRight" :overlay="rao">
    <q-scroll-area class="fit">

      <q-list-header>布局管理</q-list-header>
      <div class="row no-wrap justify-center">
        <div class="col gutter-xs q-pr-xs" style="max-width: 160px;">
          <div>
            <q-toggle v-model="header" label="Header" />
          </div>
          <div>
            <q-toggle v-model="lao" label="Left as Overlay" />
          </div>
          <div>
            <q-toggle v-model="rao" label="Right as Overlay" />
          </div>
        </div>
      </div>

      <div class="row justify-center q-mt-lg">
        <q-chip color="primary" square detail icon="widgets">
          view: {{ view }}
        </q-chip>
      </div>

      <div class="flex justify-center q-mt-lg">
        <div style="width: 360px">
          <div class="doc-layout-grid row justify-center">
            <div class="col flex flex-center">
              <div class="column group" style="max-width: 40px">
                <q-radio color="orange" v-model="topleft" val="l" label="l" />
                <q-radio color="orange" v-model="topleft" val="h" label="h" />
              </div>
            </div>
            <div class="col flex flex-center">
              <div class="column group" style="max-width: 40px">
                <q-radio v-model="topcenter" val="h" label="h" />
                <q-radio v-model="topcenter" val="H" label="H" />
              </div>
            </div>
            <div class="col flex flex-center">
              <div class="column group" style="max-width: 40px">
                <q-radio color="secondary" v-model="topright" val="r" label="r" />
                <q-radio color="secondary" v-model="topright" val="h" label="h" />
              </div>
            </div>
          </div>
          <q-card-separator />
        </div>
        <div class="detail" v-for="color in colors" :key="color">
          <q-radio v-model="radio2" :val="color" :color="color" :label="color" />
          <div class="detailed-color column flex-center" v-for="n in 14" :key="n">
            <q-radio v-if="n>=4" v-model="radio2" :val="`${color}-${n}`" :color="`${color}-${n}`" :label="`${color}-${n}`" />
          </div>
        </div>

      </div>
    </q-scroll-area>
  </q-layout-drawer>




  <!-- sub-routes get injected here: -->
  <q-page-container>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </q-page-container>

  <!-- Footer -->
  <q-layout-footer>

  </q-layout-footer>

</q-layout>
</template>

<style>
html,body{
  overflow: hidden;
}
</style>


<script>
import FtyMenu from "../components/FtyMenu";
import TagsView from "../components/TagsView";
import {
  defaultAccessMenu
} from '../store/menurouter.js'
export default {
  components: {
    FtyMenu,
    TagsView
  },
  data() {
    return {
      particulecolor: ['#79F1A4', '#0E5CAD', '#E80505'],
      shrinkMenu: false,
      headerReveal: true,
      circlenum: 10,
      mymenuList: [],
      option: [{
          label: '中文 (简体)',
          value: 'zh-hans'
        }, {
          label: 'English (US)',
          value: 'en-us'
        },
        {
          label: 'English (UK)',
          value: 'en-uk'
        },
        {
          label: 'Română',
          value: 'ro'
        },

        {
          label: 'Italiano',
          value: 'it'
        },
        {
          label: 'Español',
          value: 'es'
        },
        {
          label: 'Le Français',
          value: 'fr'
        },
        {
          label: 'Deutsche',
          value: 'de'
        },
        {
          label: 'Russian',
          value: 'ru'
        },
      ],
      lang: "zh-hans",
      header: true,
      lao: false,
      rao: true,
      topleft: "h",
      topcenter: "h",
      topright: "h",
      middleleft: "L",
      middlecenter: "p",
      middleright: "R",

      bottomleft: "f",
      bottomcenter: "f",
      bottomright: "f",
      showLeft: true,
      showRight: false,
      modelHex: '#027be3',
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imgurl: 'http://7xi8d6.com1.z0.glb.clouddn.com/20180129074038_O3ydq4_Screenshot.jpeg',
      radio2: "blue",
      mainColors: [
        "primary",
        "secondary",
        "tertiary",
        "positive",
        "negative",
        "info",
        "warning",
        "faded",
        "dark",
        "black"
      ],
      mainLightColors: ["white", "light"],
      colors: [
        "red",
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deep-orange",
        "brown",
        "grey",
        "blue-grey"
      ],
    }

  },
  watch: {
    lang(lang) {
      // 动态导入，因此只按需求加载
      import (`quasar-framework/i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
      })
    }
  },
  computed: {
    view() {
      let top = `${this.topleft}${this.topcenter}${this.topright}`,
        middle = `${this.middleleft}${this.middlecenter}${this.middleright}`,
        bottom = `${this.bottomleft}${this.bottomcenter}${this.bottomright}`;
      return `${top} ${middle} ${bottom}`;
    },
    menuList() {
      let leftmenu = defaultAccessMenu.filter(item => {
        return item.leftMemu
      });



      let fouter = this.$route.matched[0].path
      let list = leftmenu.map(item => {
        return item.path === fouter ?
          item.open = true :
          item.open = false;
      })
      this.mymenuList = leftmenu
      return this.mymenuList
    }

  }

}
</script>
