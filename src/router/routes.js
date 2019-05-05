import AuthLayout from '@/components/layout/AuthLayout.vue'
import Login from '@/components/views/authentication/Login.vue'
import Register from '@/components/views/authentication/Register.vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import Dashboard from '@/components/shared/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'AuthLayout',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/home',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

export default routes
