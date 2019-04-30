import { AUTH_STATUS } from '../../../constants'

export const state = {
  status: AUTH_STATUS.NOT_LOGGED_IN,
  token: undefined,
  user: undefined
}
