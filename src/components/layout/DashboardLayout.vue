<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Billeterapp"
      title="Billeterapp"
    >
      <template slot="links">
        <sidebar-item v-if="isClient" :link="{name: 'Inicio', icon: 'ni ni-tv-2 text-orange', path: '/home'}"/>
        <sidebar-item v-if="isClient" :link="{name: 'Transferencias', icon: 'ni ni-send text-orange', path: '/transference'}"/>
        <sidebar-item v-if="isClient" :link="{name: 'Pagos', icon: 'ni ni-credit-card text-orange', path: '/payment'}"/>
        <sidebar-item v-if="isShopkeeper" :link="{name: 'Recargas', icon: 'ni ni-money-coins text-orange', path: '/charge'}"/>
        <sidebar-item :link="{name: 'Reportes', icon: 'ni ni-bullet-list-67 text-orange', path: '/report'}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import { FadeTransition } from 'vue2-transitions'
import { ROLE_TYPES } from '@/constants'

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data () {
    return {
      sidebarBackground: 'vue' // vue|blue|orange|green|red|primary
    }
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    }
  },
  computed: {
    isShopkeeper () {
      return this.$store.getters.currentRole === ROLE_TYPES.SHOPKEEPER
    },
    isClient () {
      return this.$store.getters.currentRole === ROLE_TYPES.CLIENT
    }
  }
}
</script>
<style lang="scss">
</style>
