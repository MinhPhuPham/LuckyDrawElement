import { localStorageCustom } from '@/helpers/localStorage'
import { IDataSource } from '@/shared/models/datasources'
import { IMiracle } from '@/shared/models/miracle'
import { TProfileState } from '../auth'
import { MYSTERIES_ACTION } from './actions'

type TMysteriesState = {
  items: IMiracle[]
  item: IMiracle | null
  datasources: IDataSource[]
  miracleLoading: boolean
  dataSourceLoading: boolean
}

const initState: TMysteriesState = {
  items: [],
  item: null,
  datasources: [],
  miracleLoading: false,
  dataSourceLoading: false,
}

export default {
  state: initState,
  getters: {
    miracles: (state: TMysteriesState) => {
      return state.items
    },
    miracle: (state: TMysteriesState) => {
      return state.item
    },
    datasources: (state: TMysteriesState) => {
      return state.datasources
    },
    miracleLoading: (state: TMysteriesState) => {
      return state.miracleLoading
    },
    dataSourceLoading: (state: TMysteriesState) => {
      return state.dataSourceLoading
    },
  },
  mutations: {
    [MYSTERIES_ACTION.SET_ITEMS]: (state: TMysteriesState, items: IMiracle[]) => {
      state.items = items
    },
    [MYSTERIES_ACTION.SET_ITEM]: (state: TMysteriesState, item: IMiracle) => {
      state.item = item
    },
    [MYSTERIES_ACTION.ADD_ITEM]: (state: TMysteriesState, item: IMiracle) => {
      state.items.unshift(item)
      state.item = item
    },
    [MYSTERIES_ACTION.DELETE_ITEM]: (state: TMysteriesState, id: string) => {
      state.items = state.items.filter((item) => item.id !== id)
    },
    [MYSTERIES_ACTION.SET_DATASOURCE]: (state: TMysteriesState, datasources: IDataSource[]) => {
      state.datasources = datasources
    },
    [MYSTERIES_ACTION.SET_ITEMS_LOADING]: (state: TMysteriesState, loading: boolean) => {
      state.miracleLoading = loading
    },
    [MYSTERIES_ACTION.SET_DATASOURCE_LOADING]: (state: TMysteriesState, loading: boolean) => {
      state.dataSourceLoading = loading
    },
  },
  actions: {
    [MYSTERIES_ACTION.SET_ITEM]: (state: TMysteriesState, item: IMiracle) => {
      state.item = item
    },
    [MYSTERIES_ACTION.SET_ITEM]: async (
      { commit, rootState }: { commit: Function; rootState: { auth: TProfileState } },
      item: IMiracle
    ) => {
      commit(MYSTERIES_ACTION.SET_ITEM, item)
      const userId = rootState.auth.user?.uid

      if (userId && item) {
        localStorageCustom.setItem(`selectedMiracle-${userId}`, JSON.stringify(item))
      } else if (userId && !item) {
        localStorageCustom.removeItem(`selectedMiracle-${userId}`)
      }
    },
  },
}
