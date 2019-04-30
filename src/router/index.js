import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Dashboard from '../components/shared/Dashboard.vue'
import Login from '../components/views/authentication/Login.vue'
import Register from '../components/views/authentication/Register.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
