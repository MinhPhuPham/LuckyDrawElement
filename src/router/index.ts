import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/public/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/private/MysteryDashboard.vue'),
  },
  {
    path: '/mys-card/:id',
    name: 'MysCard',
    component: () => import(/* webpackChunkName: "card" */ '../views/public/MysteryCardPlay.vue'),
  },
  {
    path: '/mys-cloud/:id',
    name: 'MysCloud',
    component: () => import(/* webpackChunkName: "cloud" */ '../views/public/MysteryCloudPlay.vue'),
  },
  {
    path: '/mys-wheel/:id',
    name: 'MysWheel',
    component: () => import(/* webpackChunkName: "wheel" */ '../views/public/MysteryWheelPlay.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
