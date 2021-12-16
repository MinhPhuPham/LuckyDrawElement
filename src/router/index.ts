import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/public/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/private/MysteryDashboard.vue'),
  },
  {
    path: '/mys-card/:id',
    name: 'mysCard',
    component: () => import(/* webpackChunkName: "card" */ '../views/public/MysteryCardPlay.vue'),
  },
  {
    path: '/mys-cloud/:id',
    name: 'mysCloud',
    component: () => import(/* webpackChunkName: "cloud" */ '../views/public/MysteryCloudPlay.vue'),
  },
  {
    path: '/mys-wheel/:id',
    name: 'mysWheel',
    component: () => import(/* webpackChunkName: "wheel" */ '../views/public/MysteryWheelPlay.vue'),
  },
  {
    path: '/not-found',
    name: 'not_found',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/problems/NotFound.vue'),
  },
  {
    path: '/system-error',
    name: 'system_error',
    component: () => import(/* webpackChunkName: "error" */ '../views/problems/Error.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'not_found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
