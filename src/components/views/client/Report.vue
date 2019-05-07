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
              En esta sección podrás encontrar un resumen de todas las transacciones hechas desde y hacia tu billetera, ordenadas desde la más reciente a la más antigua, si realizaste un pago se mostrará la entidad a la cual hiciste el pago, si es una transferencia, se mostrará a qué billetera lo hiciste.
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
                <div class="row">
                  <div class="card shadow w-100" :class="'light'">
                    <div class="card-header border-0"
                        :class="'light'">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="'light'">
                            Reporte de transacciones
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush"
                                  :class="'table-light'"
                                  :thead-classes="'thead-light'"
                                  tbody-classes="list"
                                  :data="reportData">
                        <template slot="columns">
                          <th>ID Transacción</th>
                          <th>Tipo</th>
                          <th>Valor</th>
                          <th>Destino</th>
                          <th>Fecha</th>
                          <th></th>
                        </template>
                        <template slot-scope="{row}">
                          <td>
                            {{row.transactionId}}
                          </td>
                          <td>
                            {{row.type}}
                          </td>
                          <td :class="'text-'+row.colorValue">
                            {{row.valueType ? '+' : '-'}}
                            {{row.value | currency('$', 2, { spaceBetweenAmountAndSymbol: true, decimalSeparator: ',' })}}
                          </td>
                          <td>
                            {{row.to}}
                          </td>
                          <td>
                            {{row.date | moment("DD/MM/YYYY hh:mm a")}}
                          </td>
                        </template>
                      </base-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div align="end">
              <base-button type="danger" @click="back()">
                Volver al menú principal
              </base-button>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TRANSACTION_TYPES_LABEL, TRANSACTION_TYPES, ROLE_TYPES } from '@/constants'
export default {
  beforeMount () {
    this.fetchReport()
  },
  data: () => ({
    ROLE_TYPES,
    reportData: []
  }),
  methods: {
    fetchReport () {
      let service = 'report'
      if (this.isShopkeeper) {
        service = 'shopkeeper/' + service
      } else if (this.isClient) {
        service = 'user/' + service
      }

      this.$api.get(service).then((success) => {
        if (success.data.data) {
          success.data.data.forEach(item => {
            this.reportData.push({
              transactionId: item.mddtransaction_id ? item.mddtransaction_id : item.id,
              type: this.getTransanctionTypeName(item.transaction_type_id),
              value: item.amount,
              valueType: item.ingress,
              colorValue: item.ingress ? 'green' : 'red',
              to: item.name ? item.name : 'Billetera #' + item.wallet_id,
              date: new Date(item.created_at)
            })
          })
        }
      }).catch((error) => {
        console.error('Error at Report@fetchReport', error)
      })
    },
    getTransanctionTypeName (id) {
      switch (id) {
        case TRANSACTION_TYPES.PAYMENT:
          return TRANSACTION_TYPES_LABEL.PAYMENT
        case TRANSACTION_TYPES.TRANSFERENCE:
          return TRANSACTION_TYPES_LABEL.TRANSFERENCE
        default:
          return 'Not supported'
      }
    },
    back () {
      this.$router.push({name: 'Dashboard'})
    }
  },
  computed: {
    isClient () {
      return this.$store.getters.currentRole === this.ROLE_TYPES.CLIENT
    },
    isShopkeeper () {
      return this.$store.getters.currentRole === this.ROLE_TYPES.SHOPKEEPER
    }
  }
}
</script>
<style>
td{
  text-align: center;
}
</style>
