<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted">
            <i class="ni ni-single-02 ni-3x"></i>
          </div>
          <div class="text-center text-muted mb-5">
            Inicie sesión con sus credenciales
          </div>
          <form role="form" @submit.prevent="login">
            <div class="mb-3">
                <base-input class="input-group-alternative mb-1"
                  name="email"
                  placeholder="Correo electrónico"
                  addon-left-icon="ni ni-email-83"
                  v-validate="{ required: true, email: true }"
                  data-vv-as="correo"
                  v-model="model.email">
              </base-input>
              <span class="text-danger" v-if="errors.has('email')">
                <small>{{errors.first('email')}}</small>
              </span>
            </div>

            <div class="mb-3">
              <base-input class="input-group-alternative mb-1"
                  placeholder="Contraseña"
                  name="password"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-validate="{ required: true }"
                  data-vv-as="contraseña"
                  v-model="model.password">
              </base-input>
              <span class="text-danger" v-if="errors.has('password')">
                <small>{{errors.first('password')}}</small>
              </span>
            </div>
            <div class="text-center">
              <base-button type="default" class="my-4" @click="login">Iniciar sesión</base-button>
            </div>
          </form>

          <modal :show.sync="modals.validationErrorModal"
              gradient="info"
              modal-classes="modal-info modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

            <div class="py-3 text-center">
              <i class="ni ni-bell-55 ni-3x"></i>
              <p class="mt-4">El formulario de autenticación contiene errores, revise los campos diligenciados e inténtelo nuevamente.</p>
            </div>
            <template slot="footer">
              <base-button type="white" @click="modals.validationErrorModal = false">Aceptar</base-button>
            </template>
          </modal>

          <modal :show.sync="modals.loginErrorModal"
              gradient="danger"
              modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

            <div class="py-3 text-center">
              <i class="ni ni-bell-55 ni-3x"></i>
              <p class="mt-4">Credenciales inválidas</p>
            </div>
            <template slot="footer">
              <base-button type="white" @click="modals.loginErrorModal = false">Aceptar</base-button>
            </template>
          </modal>

        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-right">
          <router-link to="/auth/register" class="text-light"><small>¿No tiene una cuenta? Regístrese</small></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AUTH_HEADER_PREFIX } from '@/constants'
import autil from '@/helpers/authentication'
export default {
  name: 'login',
  data () {
    return {
      modals: {
        validationErrorModal: false,
        loginErrorModal: false
      },
      model: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('login', this.model).then(success => {
            this.$api.defaults.headers.common['Authorization'] = AUTH_HEADER_PREFIX + autil.getCurrentToken()
            this.$router.push({name: 'Dashboard'})
          }).catch(error => {
            console.log(error)
            this.modals.loginErrorModal = true
          })
        } else {
          this.modals.validationErrorModal = true
        }
      }).catch(() => {
        this.modals.validationErrorModal = true
      })
    }
  }
}
</script>
<style>
</style>
