/* eslint-disable */

import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: Func
    $store: Store<State>
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
