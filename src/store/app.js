// import Util from '@/libs/util'
import {
  defaultAccessMenu
} from './menurouter'

const app = {
  state: {
    currentPath: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }], // 面包屑数组
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }], // 打开的标签
    cachePage: [], // 缓存的页面
    dontCache: ['home_index'], // 在这里定义你不想要缓存的页面的name属性值
    currentModule: '', // 当前模块
    accessMenu: [], // 可访问的菜单,
    openAccessMenu: [], // 展开的可访问的菜单(子级包含父级name)
    moduleList: [], // 模块列表
    moduleMenu: [] // 模块菜单
  },
  mutations: {
    setOpenAccessMenu (state, list) {
      state.openAccessMenu = list
    },
    setAccessMenu (state, list) {
      state.openAccessMenu = list
    },
    setModuleList (state, list) {
      state.moduleList = list
    },
    setModuleMenu (state, list) {
      state.moduleMenu = list
    },
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      // 替换新标签
      state.pageOpenedList.splice(get.index, 1, openedPage)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    }
  },
  actions: {
    async updateAccessMenu ({
      commit
    }) {
      let accesseMenu = defaultAccessMenu
      try {
        // let response = await getAccessMemu()
        // accesseMenu = response.data.data
      } catch (e) {

      }
      //   let openAccesseMenu = Util.openAccesseMenu(accesseMenu)
      let moduleList = defaultAccessMenu.filter(item => {
        return item.leftMemu
      })
      let currentModule = moduleList[0].name
      let moduleMenu = moduleList[0].children

      commit('setModuleMenu', moduleMenu)
      commit('setCurrentModule', currentModule)
      commit('setModuleList', moduleList)
      commit('setAccessMenu', accesseMenu)
    //   commit('setOpenAccessMenu', openAccesseMenu)
    },
    changeModule ({
      commit,
      state
    }, module) {
      let accesseMenu = state.accessMenu
      let moduleList = accesseMenu.filter(item => {
        return item.leftMemu && item.name === module
      })
      let moduleMenu = moduleList[0].children
      commit('setModuleMenu', moduleMenu)
      commit('setCurrentModule', module)
    },
    closePage ({
      commit,
      state
    }, name) {
      return new Promise((resolve) => {
        commit('closePage', name)
        resolve([...state.pageOpenedList])
      })
    },
    closePages ({
      commit,
      state
    }, data) {
      return new Promise((resolve) => {
        commit('closePages', data)
        resolve([...state.pageOpenedList])
      })
    }
  }
}

export default app
