<template>
  <v-container fluid>
    <v-card>
      THis is detail
      <div>
        {{ book }}
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: ['book']

}
</script>
