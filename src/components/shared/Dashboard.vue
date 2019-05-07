<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-5 col-lg-12">
          <stats-card title="Hora del sistema"
                      type="gradient-red"
                      :sub-title="now | moment('DD/MM/YYYY hh:mm:ss a')"
                      icon="ni ni-active-40"
                      class="mb-4 mb-xl-0">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i></span>
              <span class="text-nowrap">Bienvenido, esta es la hora del sistema</span>
            </template>
          </stats-card>
        </div>

        <div class="col-xl-5 col-lg-12">
          <stats-card title="Balance"
              type="gradient-green"
              :sub-title="balance | currency('$', 2, { spaceBetweenAmountAndSymbol: true, decimalSeparator: ',' })"
              icon="ni ni-money-coins"
              class="mb-4 mb-xl-0">

            <template slot="footer">
              <span class="text-nowrap" v-if="isClient">Este es tu dinero en la billetera</span>
              <span class="text-nowrap" v-if="isShopkeeper">Este es tu cupo máximo de recargas</span>
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
import { ROLE_TYPES } from '@/constants'

export default {
  beforeMount () {
    this.getBalance()
  },
  created () {
    setInterval(() => { this.now = new Date() }, 1000)
  },
  data () {
    return {
      ROLE_TYPES,
      now: new Date(),
      balance: 0
    }
  },
  methods: {
    getBalance () {
      let service = 'current-money'
      if (this.isShopkeeper) {
        service = 'shopkeeper/' + service
      } else if (this.isClient) {
        service = 'user/' + service
      }

      this.$api.get(service).then((success) => {
        this.balance = success.data.data.current
      }).catch((error) => {
        console.error('Error at Dashboard@getBalance', error)
        this.balance = 0
      })
    }
  },
  computed: {
    userName () {
      return this.$store.getters.currentUser
    },
    isClient () {
      return this.$store.getters.currentRole === this.ROLE_TYPES.CLIENT
    },
    isShopkeeper () {
      return this.$store.getters.currentRole === this.ROLE_TYPES.SHOPKEEPER
    },
    today () {
      return new Date()
    }
  }
}
</script>
<style>
.bg-gradient-success {
  background: linear-gradient(87deg, rgb(62, 122, 150), #75B7D6 100%) !important;
}
</style>
