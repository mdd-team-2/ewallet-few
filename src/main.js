// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ComponentPlugin from './plugins/argon'
import BootstrapVue from 'bootstrap-vue'
import es from 'vee-validate/dist/locale/es'
import VeeValidate, { Validator } from 'vee-validate'
import Vue2Filters from 'vue2-filters'
import { ROOT_API_URL } from '@/constants'
import axios from 'axios'
import moment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(ComponentPlugin)
Vue.use(VeeValidate)
Vue.use(Vue2Filters)
Vue.use(moment)
Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: ROOT_API_URL
    })
  }
})

Validator.localize('es', es)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
