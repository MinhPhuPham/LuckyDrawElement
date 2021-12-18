<template>
  <template v-if="!isInit">
    <ms-loader></ms-loader>
  </template>
  <template v-else>
    <router-view />
    <a-back-top />
  </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { BackTop } from 'ant-design-vue'
import { Watch } from 'vue-property-decorator'
import FullPageLoader from '@/shared/composables/loader/FullPageLoader.vue'

Vue.registerHooks(['beforeRouteEnter'])

@Options({
  components: {
    [BackTop.name]: BackTop,
    [FullPageLoader.name]: FullPageLoader,
  },
})
export default class App extends Vue {
  get isPrivate() {
    return this.$route.meta?.isPrivate
  }

  get isInit() {
    return this.$waitingInitAuth?.value
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
