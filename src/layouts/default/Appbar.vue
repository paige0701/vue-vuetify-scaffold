<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-spacer />
    <v-btn v-if="$cookies.get('access_token')" @click="logoutUser">
      logout
    </v-btn>
    <v-btn v-if="$cookies.get('access_token') === ''">
      login
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'DefaultBar',
  computed: {
    drawer: {
      get() {
        return this.$store.getters['app/getDrawer']
      },
      set(value) {
        return this.$store.dispatch('app/toggleDrawer', value)
      }
    }
  },
  methods: {
    async logoutUser() {
      const { data } = await this.$api.workout.logout()
      this.$cookies.set('access_token', '')
      this.$cookies.set('refresh_token', '')
      await this.$router.push({name:'SignInMethods',})
    }
  }
}
</script>
