import { ROOT_API_URL } from '../../../constants'
import axios from 'axios'

export const actions = {
  login: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(ROOT_API_URL + '/login', {user: user})
        .then(response => {
          let token = response.data.data.token
          let user = {
            name: response.data.data.name,
            role: response.data.data.type
          }
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
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
      axios.post(ROOT_API_URL + '/signup', {user: user})
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
      resolve()
    })
  }
}
