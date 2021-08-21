<template>
  <v-app>
    <page-bar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import PageBar from '@/layouts/page/AppBar'
export default {
  components: {
    PageBar
  }

}
</script>
