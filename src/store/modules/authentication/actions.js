import { ROOT_API_URL, AUTH_HEADER_PREFIX } from '../../../constants'
import axios from 'axios'

export const actions = {
  login: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(ROOT_API_URL + '/login', {user: user})
        .then(response => {
          console.log(response.data)
          let token = response.data.data.token
          let user = {
            name: response.data.data.name,
            role: response.data.data.type
          }
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] = AUTH_HEADER_PREFIX + token
          commit('auth_success', {token, user})
          resolve(response)
        })
        .catch(error => {
          commit('auth_error')
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          reject(error)
        })
    })
  },
  register: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(ROOT_API_URL + '/register', {user: user})
        .then(response => {
          commit('logout')
          resolve(response)
        })
        .catch(error => {
          commit('auth_error', error)
          reject(error)
        })
    })
  },
  logout: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
