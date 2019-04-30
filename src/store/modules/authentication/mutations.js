import { AUTH_STATUS } from '../../../constants'

export const mutations = {
  auth_request: (state) => {
    state.status = AUTH_STATUS.LOADING
  },
  auth_success: (state, token, user) => {
    state.status = AUTH_STATUS.LOGGED_ID
    state.token = token
    state.user = user
  },
  auth_error: (state) => {
    state.status = AUTH_STATUS.ERROR
  },
  logout: (state) => {
    state.status = AUTH_STATUS.NOT_LOGGED_IN
    state.token = undefined
    state.user = undefined
  }
}
