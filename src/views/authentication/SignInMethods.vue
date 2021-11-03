<template>
  <v-container class="fill-height">
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-container fluid>
        <v-card-text>
          <p class="text-h4 text--primary">
            Login
          </p>
          <div class="text--primary">
            No need to register.<br>
            You can you Kakao or google account to login.
          </div>
        </v-card-text>
        <v-list-item class="justify-center">
          <a
            @click="login('kakao')"
          >
            <img
              src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              width="250"
            >
          </a>
        </v-list-item>
        <v-list-item class="justify-center">
          <GoogleLogin
            :params="params"
            :render-params="renderParams"
            :on-success="onSuccess"
            :on-failure="onFailure"
          />
        </v-list-item>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import GoogleLogin from 'vue-google-login'

export default {
  components: {GoogleLogin},
  data: () => {
    return {
      email: '',
      password: '',
      auth: '',
      provider: '',
      params: {
        client_id: process.env.VUE_APP_ENV_GOOGLE_CLIENT_ID
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    async onSuccess(googleUser) {
      console.info(`success -- `, googleUser)
      const {Zb} = googleUser
      const {nt} = googleUser
      const access_token = Zb.access_token
      const email = nt.Yt
      try {
        const {data} = await this.$api.workout.loginWithGoogle({access_token, email})
        this.$cookies.set('access_token', data.access_token)
        this.$cookies.set('refresh_token', data.refresh_token)
        await this.$router.push({name: 'Home'})
      } catch (e) {
        alert(`Google login failed, ${e}`)
      }

    },
    onFailure(err) {
      console.info(err)
    },
    login(method) {
      if (method === 'kakao') {
        Kakao.Auth.login({
          success: async (authObj) => {
            const {data} = await this.$api.workout.loginWithKakao(authObj)
            this.$cookies.set('access_token', data.access_token)
            this.$cookies.set('refresh_token', data.refresh_token)
            await this.$router.push({name: 'Home'})
          },
          fail: function (err) {
            alert(`kakako login failed, ${err}`)
          },
        })
      }
    }
  }
}
</script>
