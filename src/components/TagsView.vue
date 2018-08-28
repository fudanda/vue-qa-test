<template>
<q-toolbar color="blue">

  <div style="width:100%">
    <q-scroll-area style="height:34px">
      <div class="tags-view-container row no-wrap">
        <q-chip ref="tag" tag square v-ripple v-for="(item, i) in tagsList" :key="i" :name="item.name" closable :class="item.name===currentPageName?'active':''" :color="item.name===currentPageName?'secondary':'blue-4'" style="margin-left:4px" @hide="closePage(item.name,i)"
          @click="linkTo(item)">{{item.name}}</q-chip>
        <!-- " -->
      </div>
    </q-scroll-area>
  </div>
  <q-select inverted class="no-shadow" color="blue" flat placeholder="标签选项" v-model="closeType" @input="tagManage" :options="[{
          label: '关闭其他',
          value: 'other'
        },
        {
          label: '关闭所有',
          value: 'all'
        }]" />

</q-toolbar>
</template>

<script>
// import ScrollPane from "./ScrollPane";
// import util from "@/libs/util.js";
export default {
  // components: {
  //   ScrollPane
  // },
  data() {
    return {
      currentPageName: this.$route.name,
      closeType: "",
      pageOpenedList: [{
        title: '首页',
        path: '/',
        name: 'home'
      }], // 打开的标
    };
  },
  computed: {
    tagsList() {
      return this.pageOpenedList;
    }
  },
  methods: {
    openNewPage(name, path, title) {
      let pageOpenedList = this.pageOpenedList;
      let openedPageLen = pageOpenedList.length;
      let i = 0;
      let tagHasOpened = false;
      console.log(name)
      console.log(path)
      console.log(title)
      console.log(openedPageLen)

      while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
          console.log(name)
          tagHasOpened = true;
          break;
        }
        i++;
      }
      console.log(pageOpenedList)
      if (!tagHasOpened) {
        this.pageOpenedList.push({
          title: title,
          path: path,
          name: name
        });
      }
    },
    openPage(name) {
      let openpageHasTag = this.tagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      console.log(name)
      if (!openpageHasTag) {
        this.openNewPage(
          name,
          this.$route.path,
          this.$route.path
        );
      }
    },
    closePage(name, i) {
      console.log(name)
      console.log(this.currentPageName)
      console.log(this.pageOpenedList)
      console.log(i)
      let latestPage=[]
      if (this.currentPageName === name) {
        if (i > 0) {
          this.pageOpenedList.splice(i, 1)
          latestPage = this.pageOpenedList.slice(-1)[0]
          console.log(this.pageOpenedList)
        }
        if (latestPage) {
          this.$router.push({
            name: latestPage.name
          })

        } else {
          this.$router.push("/");
        }
      }
      else{
         if (i > 0) {
          this.pageOpenedList.splice(i, 1)
          latestPage = this.pageOpenedList.slice(-1)[0]
          console.log(this.pageOpenedList)
        }
      }
    },
    linkTo(item) {

      console.log(item.path)
      this.$router.push(item.path);
    },
    // moveToCurrentTag() {
    //   const tags = this.$refs.tag;
    //   this.$nextTick(() => {
    //     for (const tag of tags) {
    //       if (tag.$attrs.name === this.$route.name) {
    //         this.$refs.scrollPane.moveToTarget(tag.$el);
    //         break;
    //       }
    //     }
    //   });
    // },
    tagManage(closeType) {
      this.$store
        .dispatch("closePages", {
          type: closeType,
          name: this.currentPageName
        })
        .then(pageOpenedList => {
          if (closeType === "all") {
            this.$router.push("/home");
          }
        });
      this.closeType = "";
    }
  },
  mounted() {
    this.openPage(this.$route.name);
    // this.moveToCurrentTag();
  },
  watch: {
    $route(to) {
      this.openPage(this.$route.name);
      this.currentPageName = to.name;
      // this.moveToCurrentTag();
    }
  }
};
</script>

<style lang="stylus" scoped>
.tags-view-container {
    .tags-view-wrapper {
        height: 34px;

        .scroll-wrapper {
            .active {
                &::after {
                    background: #0bda72;
                }
            }
        }
    }
}
</style>
