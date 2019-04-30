import { API_URI, HTTP_METHODS } from '../../../constants'
import axios from 'axios'

export const actions = {
  login: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      let payload = {
        url: API_URI + '/login',
        data: user,
        method: HTTP_METHODS.POST
      }
      axios(payload)
        .then(response => {
          const token = response.data.token
          const user = response.data.user
          localStorage.setItem('user', token)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit('auth_success', token, user)
          resolve(response)
        })
        .catch(error => {
          commit('auth_error')
          localStorage.removeItem('user')
          reject(error)
        })
    })
  },
  register: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      let payload = {
        url: API_URI + '/register',
        data: user,
        method: HTTP_METHODS.POST
      }
      axios(payload)
        .then(response => {
          const token = response.data.token
          const user = response.data.user
          localStorage.setItem('user', token)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit('auth_success', token, user)
          resolve(response)
        })
        .catch(error => {
          commit('auth_error', error)
          localStorage.removeItem('token')
          reject(error)
        })
    })
  },
  logout: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
