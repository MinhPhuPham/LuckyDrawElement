<template>
  <router-view />
  <a-back-top />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { BackTop } from 'ant-design-vue'

import { onAuthStateChanged } from 'firebase/auth'
import { Watch } from 'vue-property-decorator'

Vue.registerHooks(['beforeRouteEnter'])

@Options({
  components: {
    [BackTop.name]: BackTop,
  },
})
export default class App extends Vue {
  get isPrivate() {
    return this.$route.meta?.isPrivate
  }

  get isInit() {
    return this.$waitingInitAuth
  }

  @Watch('$waitingInitAuth', { deep: true }) onChange(value: Boolean) {
    console.log(value)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
