import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'
import authUtils from '@/helpers/authentication'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (authUtils.getCurrentToken() && authUtils.getCurrentUser()) {
    let token = authUtils.getCurrentToken()
    let user = JSON.parse(authUtils.getCurrentUser())
    store.commit('auth_success', {token, user})
  } else {
    store.commit('logout')
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (store.getters.isLoggedIn) {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
