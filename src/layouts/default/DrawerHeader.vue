<template>
  <v-list-item>
    <v-list-item-content @click="checkCurrentRoute">
      <v-list-item-title class="text-h6">
        Workout
      </v-list-item-title>
      <v-list-item-subtitle>
        everyday
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'DefaultDrawerHeader',
  methods: {
    checkCurrentRoute() {
      if (this.$route.name !== 'Home') {
        this.$router.push('/')
      }
    }
  }
}
</script>
