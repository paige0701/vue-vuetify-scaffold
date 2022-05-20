<template>
  <v-container fluid>
    <v-card class="yellow pa-3">
      <h1>This is an profile page</h1>
      <router-link :to="{ name: 'ProfileDetail', params: { id: 1234 } }">
        Profile
      </router-link>
    </v-card>
  </v-container>
</template>
