/* eslint-disable */
import { Firestore } from 'firebase/firestore'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: Function
    $store: Store<State>
    $database: Firestore
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
