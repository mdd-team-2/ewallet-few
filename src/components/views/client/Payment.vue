<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="col-xl-6 col-lg-6">
        <stats-card title="Ayuda"
                    type="gradient-blue"
                    :sub-title="'21/03/2019'"
                    icon="ni ni-active-40"
                    class="mb-4 mb-xl-0">

          <!-- <template slot="footer">
            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i></span>
            <span class="text-nowrap">Fecha de tu última actividad</span>
          </template> -->
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
                  ¿Qué servicio quieres pagar?
                  <b-form-select v-model="selectedService" :options="services"></b-form-select>
                  <button @click="queryWallet()">Consultar</button>
                </div>
                <div v-if="model.service">
                  <div class="row">
                    Muy bien, se realizará un pago a ese servicio
                  </div>
                  <div class="row">
                    ¿Cuánto dinero quieres pagar?
                    <input type="number" v-model.number="model.value">
                  </div>
                  <div>
                    <button @click="pay()">Pagar</button>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  beforeMount () {
    this.fetchServices()
  },
  data: () => ({
    services: [],
    selectedService: null,
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
        console.error('Error at Payment@fetchServices', error)
      })
    },
    pay () {
      this.$api.post('/user/payment', {payment: this.model}).then((success) => {
        console.log(success.data)
        alert('Exito :D')
      }).catch((error) => {
        console.error('Error in Transference@transfer: ', error)
      })
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
