<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-4 col-lg-6">
          <stats-card title="Última actividad"
                      type="gradient-red"
                      :sub-title="'21/03/2019'"
                      icon="ni ni-active-40"
                      class="mb-4 mb-xl-0">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i></span>
              <span class="text-nowrap">Fecha de tu última actividad</span>
            </template>
          </stats-card>
        </div>

        <div class="col-xl-4 col-lg-6">
          <stats-card title="Balance"
              type="gradient-green"
              :sub-title="10000000 | currency('$', 2, { spaceBetweenAmountAndSymbol: true, decimalSeparator: ',' })"
              icon="ni ni-money-coins"
              class="mb-4 mb-xl-0">

            <template slot="footer">
              <span class="text-nowrap">Este es tu dinero en la billetera</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12  mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Bienvenido</h6>
                <h5 class="h3 text-white mb-0">¡Hola, {{userName}}!</h5>
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
  data () {
    return {
      last: new Date()
    }
  },
  methods: {
  },
  mounted () {
  },
  computed: {
    userName () {
      return this.$store.getters.currentUser
    }
  }
}
</script>
<style>
.bg-gradient-success {
  background: linear-gradient(87deg, rgb(62, 122, 150), #75B7D6 100%) !important;
}
</style>
