import { defineAsyncComponent } from 'vue'
export default {
  MiracleModal: defineAsyncComponent(
    () => import(/* webpackChunkName: "miracle_modals" */ '@/components/miracle/MiracleFormModal.vue')
  ),
}
