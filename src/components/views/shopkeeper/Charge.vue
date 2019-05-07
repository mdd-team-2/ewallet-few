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
              Carga dinero a las cuentas de los clientes de la plataforma, busca por correo electrónico al usuario y digita el monto.
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
                            Recargas
                          </h3>
                          <div class="mb-1">¿A quién quieres cargar dinero?</div>
                          <div class="row">
                            <div class="col-md-6">
                              <base-input v-model="queriedWallet"
                                  placeholder="Ingresa una dirección de correo electrónico"
                                  addon-left-icon="ni ni-email-83">
                              </base-input>
                            </div>
                            <div class="col-md-2">
                              <base-button type="default" @click="queryWallet()">Consultar</base-button>
                            </div>
                          </div>
                          <div v-if="model.wallet">
                            <div class="mt-0 mb-3">
                              Se realizará una recarga a <strong>{{targetUser}}</strong>
                            </div>
                            <div class="mb-1">
                              Ingrese el monto
                            </div>
                            <base-input v-model.number="model.value"
                                placeholder="¿Cuánto se recargará?"
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
                            <base-button type="default" icon="ni ni-check-bold" @click="transfer()">Recargar</base-button>
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
        <p class="mt-4">La transacción se completó exitosamente</p>
      </div>
      <template slot="footer">
        <base-button type="white" @click="close()">Aceptar</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  data: () => ({
    queriedWallet: null,
    targetUser: null,
    modals: {
      errorModal: false,
      success: false
    },
    errorMsg: null,
    model: {
      value: 0,
      wallet: null
    }
  }),
  methods: {
    queryWallet () {
      let payload = {wallet: {email: this.queriedWallet}}
      this.$api.post('/admin/consult-wallet', payload).then((success) => {
        this.model.wallet = success.data.data.wallet
        this.targetUser = success.data.data.user
      }).catch((error) => {
        this.errorMsg = 'No se encontro ese correo asociado a un usuario'
        this.modals.errorModal = true
        console.error('Error in Charge@queryWallet: ', error)
      })
    },
    transfer () {
      this.$api.post('/admin/transfer', {transfer: this.model}).then((success) => {
        this.modals.success = true
      }).catch((error) => {
        this.errorMsg = 'No se puede completar la recarga'
        this.modals.errorModal = true
        console.error('Error in Charge@transfer: ', error)
      })
    },
    close () {
      this.modals.success = false
      this.$router.push({name: 'Dashboard'})
    }
  }
}
</script>
<style>

</style>
