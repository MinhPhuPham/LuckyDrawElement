import { IUser, IUserFull, UserModel } from '@/shared/models/user'
import { AUTH_ACTION } from './actions'

type TProfileState = {
  user: IUser | null
  loading: boolean
}

const initState: TProfileState = {
  user: null,
  loading: false,
}

export default {
  state: initState,
  getters: {
    isAuth: (state: TProfileState) => {
      return !!state.user
    },
    userInfo: (state: TProfileState) => {
      return state.user
    },
  },
  mutations: {
    [AUTH_ACTION.SET_USER]: (state: TProfileState, payload: { user: IUserFull }) => {
      state.user = payload.user ? new UserModel(payload.user).parseModel() : null
    },
    [AUTH_ACTION.SET_LOADING]: (state: TProfileState, loading: boolean) => {
      state.loading = loading
    },
  },
  actions: {
    [AUTH_ACTION.UPSERT_USER]: async ({ commit }: { commit: Function }, payload: { user: IUser }) => {
      commit(AUTH_ACTION.SET_USER, payload)
    },
  },
}
