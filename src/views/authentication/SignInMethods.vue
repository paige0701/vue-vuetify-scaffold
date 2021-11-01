<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/" />
        <v-card
          class="text-center px-12 py-15"
          width="460"
        >
          <v-btn
            block
            class="mt-10"
            color="primary"
            rounded
            x-large
            @click="login('google')"
          >
            Login with google
          </v-btn>
          <a id="custom-login-btn" @click="login('kakao')">
            <img
              src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              width="222"
            />
          </a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      email: '',
      password: '',
      auth: '',
      provider: '',
    }
  },
  methods: {
    login(method) {
      if (method === 'kakao') {
        Kakao.Auth.login({
          success: async (authObj) => {
            const { data } = await this.$api.workout.loginWithKakao(authObj)
            this.$cookies.set('access_token', data.access_token)
            this.$cookies.set('refresh_token', data.refresh_token)
            await this.$router.push({name: 'Home'})
          },
          fail: function(err) {
            alert(`kakako login failed, ${err}`)
          },
        })
      }
    }
  }
}
</script>
