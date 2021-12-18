import { createStore } from 'vuex'

import auth from './auth'
import mysteries from './mysteries'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    mysteries,
  },
})

export default store
