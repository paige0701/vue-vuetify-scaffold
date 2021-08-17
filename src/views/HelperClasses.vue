<template>
  <v-container fluid>
    <v-card class="pa-3">
      pa-3 is padding all 3 - 12px
    </v-card>
    <v-card class="ma-5">
      ma-5 is margin all 5 - 20px
    </v-card>
    <v-card class="d-none d-sm-block">
      display block when breakpoint is bigger than sm
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'HelperClasses'
}
</script>
