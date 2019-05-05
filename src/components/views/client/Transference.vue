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
                  ¿A quién quieres transferir dinero?
                  <input type="text" v-model="queriedWallet">
                  <button @click="queryWallet()">Consultar</button>
                </div>
                <div v-if="model.wallet">
                  <div class="row">
                    Perfecto, transferiremos dinero a {{targetUser}}
                  </div>
                  <div class="row">
                    ¿Cuánto dinero quieres transferir?
                    <input type="number" v-model.number="model.value">
                  </div>
                  <div>
                    <button @click="transfer()">Transferir</button>
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
export default {
  data: () => ({
    queriedWallet: null,
    targetUser: null,
    model: {
      value: 0,
      wallet: null
    }
  }),
  methods: {
    queryWallet () {
      let payload = {wallet: {email: this.queriedWallet}}
      this.$api.post('/consult-wallet', payload).then((success) => {
        this.model.wallet = success.data.data.wallet
        this.targetUser = success.data.data.user
      }).catch((error) => {
        console.error('Error in Transference@queryWallet: ', error)
      })
    },
    transfer () {
      this.$api.post('/user/transfer', {transfer: this.model}).then((success) => {
        console.log(success.data)
      }).catch((error) => {
        console.error('Error in Transference@transfer: ', error)
      })
    }
  }
}
</script>
<style>

</style>
