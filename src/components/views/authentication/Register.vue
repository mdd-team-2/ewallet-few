<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        Regístrese
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Nombres"
                                    addon-left-icon="ni ni-circle-08"
                                    v-model="model.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Apellidos"
                                    addon-left-icon="ni ni-badge"
                                    v-model="model.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Correo electrónico"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Contraseña"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Confirme la contraseña"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.pwdConfirm">
                        </base-input>

                        <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="login">Create account</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import crypto from 'crypto-js'
import { HASH_NONCE } from '@/constants'
export default {
  name: 'register',
  data () {
    return {
      model: {
        name: null,
        lastname: null,
        email: null,
        password: null,
        pwdConfirm: null
      }
    }
  },
  methods: {
    login () {
      let hash = crypto.SHA256(HASH_NONCE + 'tumama')
      let strHash2 = hash.toString(crypto.enc.Hex)
      console.log(strHash2)
    }
  }
}
</script>
<style>
</style>
