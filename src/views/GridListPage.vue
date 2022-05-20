<template>
  <v-container>
    <v-row>
      <v-col
        v-for="i in 12"
        :key="i"
        :cols="12"
        sm="6"
        md="4"
        lg="3">
        <v-card> card {{ i }} </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
