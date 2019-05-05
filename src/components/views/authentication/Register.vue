<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                  <div class="text-center text-muted">
                    <i class="ni ni-tag ni-3x"></i>
                  </div>
                  <div class="text-center text-muted mb-5">
                    Regístrese
                  </div>
                  <form role="form" @submit.prevent="signup()">
                    <div class="mb-3">
                      <base-input class="input-group-alternative mb-1"
                          placeholder="Nombres"
                          name="name"
                          addon-left-icon="ni ni-circle-08"
                          v-model="model.name"
                          v-validate="{ required: true, min: 3, max: 30 }"
                          data-vv-as="nombres">
                      </base-input>
                      <span class="text-danger" v-if="errors.has('name')">
                        <small>{{errors.first('name')}}</small>
                      </span>
                    </div>

                    <div class="mb-3">
                      <base-input class="input-group-alternative mb-1"
                          placeholder="Apellidos"
                          addon-left-icon="ni ni-badge"
                          name="lastname"
                          v-model="model.lastname"
                          v-validate="{ required: true, min: 3, max: 30 }"
                          data-vv-as="apellidos">
                      </base-input>
                      <span class="text-danger" v-if="errors.has('lastname')">
                        <small>{{errors.first('lastname')}}</small>
                      </span>
                    </div>

                    <div class="mb-3">
                      <base-input class="input-group-alternative mb-1"
                          placeholder="Correo electrónico"
                          addon-left-icon="ni ni-email-83"
                          name="email"
                          v-model="model.email"
                          v-validate="{ required: true, email: true }"
                          data-vv-as="correo electrónico">
                      </base-input>
                      <span class="text-danger" v-if="errors.has('email')">
                        <small>{{errors.first('email')}}</small>
                      </span>
                    </div>

                    <div class="mb-3">
                      <base-input class="input-group-alternative mb-1"
                          placeholder="Contraseña"
                          type="password"
                          name="password"
                          addon-left-icon="ni ni-lock-circle-open"
                          v-model="model.password"
                          v-validate="{ required: true, min: 8, max: 50 }"
                          data-vv-as="contraseña">
                      </base-input>
                      <span class="text-danger" v-if="errors.has('password')">
                        <small>{{errors.first('password')}}</small>
                      </span>
                    </div>

                    <div class="mb-3">
                      <base-input class="input-group-alternative mb-1"
                          placeholder="Confirme la contraseña"
                          type="password"
                          name="passwordconf"
                          addon-left-icon="ni ni-lock-circle-open"
                          v-model="model.password_confirmation"
                          v-validate="{ required: true, min: 8, max: 50 }"
                          data-vv-as="contraseña">
                      </base-input>
                      <span class="text-danger" v-if="errors.has('passwordconf')">
                        <small>{{errors.first('passwordconf')}}</small>
                      </span><br>
                      <span class="text-danger" v-if="!arePasswordsEqual">
                        <small>Las contraseñas no coinciden</small>
                      </span>
                    </div>

                    <div class="text-center">
                      <base-button type="default" class="my-4" @click="signup()">Crear cuenta</base-button>
                    </div>
                  </form>

                  <modal :show.sync="modals.successModal"
                      gradient="success"
                      modal-classes="modal-success modal-dialog-centered">
                    <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

                    <div class="py-3 text-center">
                      <i class="ni ni-satisfied ni-3x"></i>
                      <h4 class="heading mt-4">Éxito</h4>
                      <p class="mt-4">Usuario creado exitosamente, ahora puede iniciar sesión</p>
                    </div>
                    <template slot="footer">
                      <base-button type="white" @click="ok()">Aceptar</base-button>
                    </template>
                  </modal>

                  <modal :show.sync="modals.validationErrorModal"
                      gradient="info"
                      modal-classes="modal-info modal-dialog-centered">
                    <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

                    <div class="py-3 text-center">
                      <i class="ni ni-bell-55 ni-3x"></i>
                      <p class="mt-4">El formulario de registro contiene errores, revise los campos diligenciados e inténtelo nuevamente.</p>
                    </div>
                    <template slot="footer">
                      <base-button type="white" @click="modals.validationErrorModal = false">Aceptar</base-button>
                    </template>
                  </modal>

                  <modal :show.sync="modals.signupErrorModal"
                      gradient="danger"
                      modal-classes="modal-danger modal-dialog-centered">
                    <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

                    <div class="py-3 text-center">
                      <i class="ni ni-bell-55 ni-3x"></i>
                      <p class="mt-4">No se ha podido completar el registro, intente más tarde o contacte al administrador del sistema</p>
                    </div>
                    <template slot="footer">
                      <base-button type="white" @click="modals.signupErrorModal = false">Aceptar</base-button>
                    </template>
                  </modal>

                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 text-right">
                    <router-link to="/auth/login" class="text-light">
                        <small>Inicie sesión</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      modals: {
        successModal: false,
        signupErrorModal: false,
        validationErrorModal: false
      },
      model: {
        name: null,
        lastname: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    signup () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('register', this.model).then(success => {
            this.modals.successModal = true
          }).catch(error => {
            console.log(error)
            this.modals.signupErrorModal = true
          })
        } else {
          this.modals.validationErrorModal = true
        }
      }).catch(() => {
        this.modals.validationErrorModal = true
      })
    },
    ok () {
      this.modals.successModal = false
      this.$router.push({name: 'Login'})
    }
  },
  computed: {
    arePasswordsEqual () {
      if (this.model.password_confirmation && this.model.password) {
        return this.model.password_confirmation === this.model.password
      }
    }
  }
}
</script>
<style>
</style>
