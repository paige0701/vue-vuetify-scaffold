<template>
  <v-container fluid>
    <v-card class="mt-5 pa-3">
      row : dense, use v-spacer
      <v-row dense>
        <v-spacer />
        <v-col>
          <v-card
            class="yellow pa-3"
            outlined
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="yellow pa-3"
            rounded
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="yellow pa-3">
            col
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-5 pa-3">
      row : no gutters
      <v-row no-gutters>
        <v-col>
          <v-card
            class="yellow pa-3"
            outlined
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="yellow pa-3"
            rounded
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="yellow pa-3">
            col
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-5 pa-3">
      row style: height 120px, align start
      <v-row
        class="red"
        :style="{ height: '120px'}"
        align="start"
      >
        <v-col>
          <v-card
            class="yellow pa-3"
            outlined
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="yellow pa-3"
            rounded
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="yellow pa-3">
            col
          </v-card>
        </v-col>
      </v-row>
      row style: height 120px, align center
      <v-row
        class="green"
        :style="{ height: '120px'}"
        align="center"
      >
        <v-col>
          <v-card
            class="yellow pa-3"
            outlined
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="yellow pa-3"
            rounded
          >
            col
          </v-card>
        </v-col>
        <v-col>
          <v-card class="yellow pa-3">
            col
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-5 pa-3 orange">
      using align self in v-col
      <v-row
        :style="{ height: '120px'}"
      >
        <v-col align-self="start">
          <v-card
            class="yellow pa-3"
            outlined
          >
            col
          </v-card>
        </v-col>
        <v-col align-self="center">
          <v-card
            class="yellow pa-3"
            rounded
          >
            col
          </v-card>
        </v-col>
        <v-col align-self="end">
          <v-card class="yellow pa-3">
            col
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'GridSystem'
}
</script>
