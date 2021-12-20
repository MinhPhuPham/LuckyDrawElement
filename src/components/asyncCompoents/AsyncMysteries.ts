import { defineAsyncComponent } from 'vue'
export default {
  MysCard: defineAsyncComponent(
    () => import(/* webpackChunkName: "mys_card_template" */ '@/components/mysteries/MysCard.vue')
  ),
  MysWheel: defineAsyncComponent(
    () => import(/* webpackChunkName: "mys_wheel_template" */ '@/components/mysteries/MysWheel.vue')
  ),
  MysCloud: defineAsyncComponent(
    () => import(/* webpackChunkName: "mys_wheel_template" */ '@/components/mysteries/MysCloud.vue')
  ),
}
