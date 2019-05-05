<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <modal :show.sync="modals.logoutModal"
               gradient="info"
               modal-classes="modal-info modal-dialog-centered">
          <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

          <div class="py-3 text-center">
            <i class="ni ni-bell-55 ni-3x"></i>
            <h4 class="heading mt-4">¿Está seguro?</h4>
            <p>Su sesión está a punto de cerrar, confirme que desea salir de la aplicación</p>
          </div>

          <template slot="footer">
            <base-button type="default"
                @click="logout()">
              Aceptar
            </base-button>
            <base-button type="white"
                @click="modals.logoutModal = false">
              Cancelar
            </base-button>
          </template>
        </modal>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <!-- <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div> -->
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="@/assets/img/theme/team-1-800x800.jpg">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{currentUser}}</span>
                        </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">¡Hola!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi perfil</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Ayuda</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item" @click="modals.logoutModal = true">
                            <i class="ni ni-user-run"></i>
                            <span>Cerrar sesión</span>
                        </div>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
export default {
  data () {
    return {
      modals: {
        logoutModal: false
      },
      activeNotifications: false,
      showMenu: false,
      searchQuery: ''
    }
  },
  methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    logout () {
      this.$store.dispatch('logout').then((success) => {
        this.$route.push({name: 'Login'})
      }).catch(error => {
        alert('error logging out')
        console.log(error)
      })
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    }
  }
}
</script>
