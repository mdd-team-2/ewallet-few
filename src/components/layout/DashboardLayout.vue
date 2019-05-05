<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Billeterapp"
      title="Billeterapp"
    >
      <template slot="links">
        <sidebar-item :link="{name: 'Inicio', icon: 'ni ni-tv-2 text-orange', path: '/home'}"/>
        <sidebar-item :link="{name: 'Mi perfil', icon: 'ni ni-single-02 text-orange', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Transferencias', icon: 'ni ni-send text-orange', path: '/transference'}"/>
        <sidebar-item :link="{name: 'Pagos', icon: 'ni ni-credit-card text-orange', path: '/payment'}"/>
        <sidebar-item :link="{name: 'Reportes', icon: 'ni ni-bullet-list-67 text-orange', path: '/report'}"/>
        <sidebar-item :link="{name: 'Recargas', icon: 'ni ni-money-coins text-orange', path: '/charge'}"/>

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
  }
}
</script>
<style lang="scss">
</style>
