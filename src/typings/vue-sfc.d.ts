/* eslint-disable */
import { Firestore } from 'firebase/firestore'
import { notification } from 'ant-design-vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: Function
    $store: Store<State>
    $database: Firestore
    $waitingInitAuth: Boolean
    $initAuth: Function
    $notification: typeof notification
    $goto: Function
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'lodash-es'
