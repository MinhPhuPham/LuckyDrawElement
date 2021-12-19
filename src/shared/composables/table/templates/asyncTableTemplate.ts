import { defineAsyncComponent } from 'vue'
export default {
  CardTableTemplate: defineAsyncComponent(
    () => import(/* webpackChunkName: "card_table" */ '@/shared/composables/table/templates/CardTableTemplate.vue')
  ),
  WheelTableTemplate: defineAsyncComponent(
    () => import(/* webpackChunkName: "card_table" */ '@/shared/composables/table/templates/WheelTableTemplate.vue')
  ),
  CloudTableTemplate: defineAsyncComponent(
    () => import(/* webpackChunkName: "card_table" */ '@/shared/composables/table/templates/CloudTableTemplate.vue')
  ),
}
