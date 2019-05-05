import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'
import autil from '@/helpers/authentication'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (autil.getCurrentToken() && autil.getCurrentUser()) {
    store.commit('auth_success', {token: autil.getCurrentToken(), user: JSON.parse(autil.getCurrentUser())})
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
