<template>
  <v-dialog
    v-model="value"
    max-width="290"
    :persistent="true">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ description }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          text
          @click="closeDialog(false)">
          cancel
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="closeDialog(true)">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: `TheConfirmDialog`,
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeDialog(confirm = false) {
      this.$emit('close', confirm);
    },
  },
};
</script>
