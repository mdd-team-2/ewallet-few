import AuthLayout from '@/components/layout/AuthLayout.vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import Dashboard from '@/components/shared/Dashboard.vue'
import Login from '@/components/views/authentication/Login.vue'
import Register from '@/components/views/authentication/Register.vue'
import Payment from '@/components/views/client/Payment.vue'
import Report from '@/components/views/client/Report.vue'
import Transference from '@/components/views/client/Transference.vue'
import Charge from '@/components/views/shopkeeper/Charge.vue'

const routes = [
  {
    path: '/auth',
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
    path: '/',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/home',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/transference',
        name: 'Transference',
        component: Transference,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/payment',
        name: 'Payment',
        component: Payment,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/report',
        name: 'Report',
        component: Report,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/charge',
        name: 'Charge',
        component: Charge,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/auth/login'
  }
]

export default routes
