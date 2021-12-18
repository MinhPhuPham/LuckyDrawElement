import { defineAsyncComponent } from 'vue'
export default {
  PreviewMiracle: defineAsyncComponent(
    () => import(/* webpackChunkName: "miracle_customize" */ '@/components/dashboard/right-board/PreviewMiracle.vue')
  ),
  InfoSettings: defineAsyncComponent(
    () => import(/* webpackChunkName: "info_settings" */ '@/components/dashboard/right-board/InfoSettings.vue')
  ),
}
