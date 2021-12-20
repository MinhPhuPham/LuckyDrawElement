/* eslint-disable */
import { Firestore } from 'firebase/firestore'
import { notification, Modal } from 'ant-design-vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: Function
    $store: Store<State>
    $database: Firestore
    $waitingInitAuth: { value: Boolean }
    $initAuth: Function
    $notification: typeof notification
    $confirm: typeof Modal.confirm
    $goto: Function
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'uniqid'
