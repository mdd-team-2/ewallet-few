<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="col-xl-8 col-lg-12">
        <stats-card type="gradient-blue"
                    sub-title="Ayuda"
                    icon="ni ni-active-40"
                    class="mb-4 mb-xl-0">

          <template slot="footer">
            <div class="text-justify">
              Realiza tus pagos de recaudo propio de una forma fácil y rápida, primero debes elegir el servicio de la lista desplegable, y luego el monto por pagar. ¡Listo! El pago será efectuado dando click en el botón Pagar
            </div>
          </template>
        </stats-card>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12  mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Bienvenido</h6>
                  <div class="row">
                    <div class="card shadow w-100" :class="'light'">
                      <div class="card-header border-0"
                          :class="'light'">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-3" :class="'light'">
                              Pagos
                            </h3>
                            <div class="mb-1">¿Qué servicio quieres pagar?</div>
                            <div class="row">
                              <div class="col-md-12">
                                <b-form-select v-model="selectedService" :options="services"></b-form-select>
                              </div>
                            </div>
                            <div v-if="model.service">
                              <div class="mt-0 mb-3">
                                Muy bien, se realizará un pago a ese servicio
                              </div>
                              <div class="mb-1">
                                ¿Cuánto dinero quieres pagar?
                              </div>
                              <base-input v-model.number="model.value"
                                  placeholder="¿Cuánto transferiremos?"
                                  addon-left-icon="ni ni-money-coins"
                                  v-validate="{required: true, numeric: true, min: 0}"
                                  class="mb-4"
                                  data-vv-as="monto"
                                  name="amount"
                                  type="number">
                              </base-input>
                              <div class="mb-4">
                                <span class="text-danger" v-if="errors.has('amount')">
                                  <small>{{errors.first('amount')}}</small>
                                </span>
                              </div>
                              <base-button type="default" icon="ni ni-check-bold" @click="pay()">Pagar</base-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.errorModal"
        gradient="danger"
        modal-classes="modal-danger modal-dialog-centered">
      <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <p class="mt-4">{{errorMsg}}</p>
      </div>
      <template slot="footer">
        <base-button type="white" @click="modals.errorModal = false">Aceptar</base-button>
      </template>
    </modal>

    <modal :show.sync="modals.success"
        gradient="success"
        modal-classes="modal-success modal-dialog-centered">
      <h6 slot="header" class="modal-title" id="modal-title-notification">Alerta del sistema</h6>

      <div class="py-3 text-center">
        <i class="ni ni-satisfied ni-3x"></i>
        <p class="mt-4">El pago se realizó exitosamente</p>
      </div>
      <template slot="footer">
        <base-button type="white" @click="close()">Aceptar</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  beforeMount () {
    this.fetchServices()
  },
  data: () => ({
    services: [],
    selectedService: null,
    modals: {
      errorModal: false,
      success: false
    },
    errorMsg: null,
    model: {
      value: 0,
      service: null
    }
  }),
  methods: {
    fetchServices () {
      this.$api.get('/services').then((success) => {
        success.data.forEach(service => {
          this.services.push({
            value: service.id,
            text: service.name
          })
        })
      }).catch((error) => {
        this.errorMsg = 'No hay servicios disponibles para pagar'
        this.modals.errorModal = true
        console.error('Error at Payment@fetchServices', error)
      })
    },
    pay () {
      this.$api.post('/user/payment', {payment: this.model}).then((success) => {
        this.modals.success = true
      }).catch((error) => {
        this.errorMsg = 'No se pudo completar el pago'
        this.modals.errorModal = true
        console.error('Error in Transference@transfer: ', error)
      })
    },
    close () {
      this.modals.success = false
      this.$router.push({name: 'Dashboard'})
    }
  },
  watch: {
    selectedService () {
      this.model.service = this.selectedService
    }
  }
}
</script>
<style>

</style>
