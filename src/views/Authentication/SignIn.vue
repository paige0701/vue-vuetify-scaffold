<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          width="460"
          class="text-center px-12 py-15"
        >
          <div class="text-h4 font-weight-black mb-15">
            Login
          </div>
          <v-text-field
            v-model="email"
            label="email"
            clearable
            prepend-icon="mdi-email"
          />
          <v-text-field
            v-model="password"
            label="password"
            clearable
            prepend-icon="mdi-lock-outline"
          />
          <v-btn
            block
            x-large
            rounded
            color="primary"
            class="mt-10"
          >
            Login
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
          email: '',
      password: ''
    }
  }
}
</script>
