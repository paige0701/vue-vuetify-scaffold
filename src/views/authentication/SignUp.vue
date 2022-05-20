<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/">
          <v-img
            class="mx-auto mb-5"
            width="120"
            :src="require('@/assets/logo2.png')" />
        </router-link>
        <v-card
          width="
          460"
          class="text-center px-12 py-15">
          <div class="text-h4 font-weight-black mb-15">Sign up</div>
          <validation-observer
            ref="observer"
            v-slot="{ invalid }">
            <validation-provider
              v-slot="{ errors }"
              name="email"
              :rules="{ required: true, email: true }">
              <v-text-field
                v-model="email"
                label="email"
                clearable
                prepend-icon="mdi-email"
                :error-messages="errors" />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="password"
              :rules="{ required: true }">
              <v-text-field
                v-model="password"
                type="password"
                label="password"
                clearable
                prepend-icon="mdi-email"
                :error-messages="errors" />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="passwordConfirm"
              :rules="{ required: true, confirmed: 'password' }">
              <v-text-field
                v-model="passwordConfirm"
                label="Password confirm"
                clearable
                type="password"
                prepend-icon="mdi-lock-outline"
                :error-messages="errors" />
            </validation-provider>
            <v-btn
              block
              x-large
              rounded
              color="primary"
              class="mt-10"
              :disabled="invalid"
              @click="validate">
              Sign up
            </v-btn>
          </validation-observer>
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
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    async validate() {
      const result = await this.$refs.observer.validate;
      if (result) {
        alert('ok');
      }
    },
  },
};
</script>
