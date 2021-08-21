<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/">
          <v-img
            class="mx-auto mb-5"
            width="120"
            :src="require('@/assets/logo2.png')"
          />
        </router-link>
        <v-card
          class="text-center px-12 py-15"
          width="460"
        >
          <validation-observer
            ref="observer"
            v-slot="{invalid}"
          >
            <v-form>
              <div class="text-h4 font-weight-black mb-15">
                Login
              </div>
              <validation-provider
                v-slot="{ errors }"
                :rules="{email: true, required: true}"
                name="email"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  clearable
                  label="email"
                  prepend-icon="mdi-email"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :rules="'required'"
                name="password"
              >
                <v-text-field
                  v-model="password"
                  :error-messages="errors"
                  clearable
                  label="password"
                  prepend-icon="mdi-lock-outline"
                />
              </validation-provider>
              <v-btn
                block
                class="mt-10"
                color="primary"
                rounded
                x-large
                :disabled="invalid"
                @click="validate"
              >
                Login
              </v-btn>
              <div>
                <router-link to="/authentication/sign-up">
                  Sign up
                </router-link>
              </div>
            </v-form>
          </validation-observer>
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
      password: ''
    }
  },
  methods: {
    async validate() {
      const result = await this.$refs.observer.validate
      if (result) {
        alert('login')
      }
    }
  }
}
</script>
