
const layout = () => import('layouts/default')

// 不作为Main组件的子页面展示的页面单独写，如下
const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('pages/login')
}

const page403 = {
  path: '/404',
  name: '404',
  component: () => import('pages/404')
}

// 作为layout组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里(children至少包含一个子路由)
const otherRouter = {
  path: '/',
  component: layout,
  redirect: 'home',
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('pages/index')
    }
  ]
}
// 作为layout组件的子页面展示并且在左侧菜单显示的路由写在appRouter里(children至少包含一个子路由)
const appRouter = [
  {
    path: '/cms',
    name: 'CMS',
    component: layout,
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('pages/cms/post.vue')
      },
      {
        path: 'article/:id',
        name: 'post_edit',
        component: () => import('pages/cms/post_edit.vue')
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('pages/cms/comment.vue')
      }
    ]
  },
  {
    path: '/system',
    name: '系统设置',
    component: layout,
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: () => import('pages/system/menu.vue')
      }
    ]
  },
  //   {
  //     path: '/permission',
  //     name: '权限管理',
  //     component: layout,
  //     children: [
  //       {
  //         path: 'function',
  //         name: 'function',
  //         component: () => import('pages/permission/function.vue')
  //       },
  //       {
  //         path: 'role',
  //         name: 'role',
  //         component: () => import('pages/permission/role.vue')
  //       },
  //       {
  //         path: 'rolepermission',
  //         name: 'rolepermission',
  //         component: () => import('pages/permission/rolepermission.vue')
  //       },
  //       {
  //         path: 'roleuser',
  //         name: 'roleuser',
  //         component: () => import('pages/permission/roleuser.vue')
  //       },
  //       {
  //         path: 'userrole',
  //         name: 'userrole',
  //         component: () => import('pages/permission/userrole.vue')
  //       }
  //     ]
  //   },
  {
    path: '/test',
    name: '测试',
    component: layout,
    children: [
      {
        path: 'backtop',
        name: 'backtop',
        component: () => import('pages/test/backtop.vue')
      },
      {
        path: 'charts',
        name: 'charts',
        component: () => import('pages/test/charts.vue')
      },
      {
        path: 'color',
        name: 'color',
        component: () => import('pages/test/color.vue')
      },
      {
        path: 'das',
        name: 'das',
        component: () => import('pages/test/das.vue')
      },
      {
        path: 'dialog',
        name: 'dialog',
        component: () => import('pages/test/dialog.vue')
      },
      {
        path: 'HelloWorld',
        name: 'HelloWorld',
        component: () => import('pages/test/HelloWorld.vue')
      },
      {
        path: 'loading',
        name: 'loading',
        component: () => import('pages/test/loading.vue')
      },
      {
        path: 'vc',
        name: 'vc',
        component: () => import('pages/test/vc.vue')
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('pages/test/table.vue')
      },
      {
        path: 'MyThree',
        name: 'MyThree',
        component: () => import('pages/MyThree.vue')
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('pages/test/test.vue')
      }
    ]
  },
  {
    path: '/add',
    name: 'add',
    component: layout,
    children: [
      {
        path: 'tableadd',
        name: 'tableadd',
        component: () => import('pages/add/tableadd.vue')
      }, {
        path: 'add2',
        name: 'add2',
        component: () => import('pages/add/add2.vue')
      }
    ]
  }
//   {
//     path: '/business',
//     name: 'business',
//     component: layout,
//     children: [
//       {
//         path: 'sku',
//         name: 'sku',
//         component: () => import('pages/develop/business/sku.vue')
//       }
//     ]
//   }
]

// const developRouter = [
//   {
//     path: '/official',
//     name: 'official',
//     component: layout,
//     children: [
//       {
//         path: 'button',
//         name: 'button',
//         component: () => import('pages/develop/official/button.md')
//       },
//       {
//         path: 'button-group',
//         name: 'button-group',
//         component: () => import('pages/develop/official/button-group.md')
//       },
//       {
//         path: 'dropdown-button',
//         name: 'dropdown-button',
//         component: () => import('pages/develop/official/dropdown-button.md')
//       },
//       {
//         path: 'toolbar',
//         name: 'toolbar',
//         component: () => import('pages/develop/official/toolbar.md')
//       }
//     ]
//   }
// ]

// 所有上面定义的路由都要写在下面的routers里
export const routes = [
  loginRouter,
  page403,
  otherRouter,
  ...appRouter
//   ...developRouter
]
