<template>
  <v-card>
    <v-container fluid>
      <v-row align="center">
        <v-col
          cols="12"
          sm="6">
          <v-select
            v-model="value"
            :items="items"
            attach
            :chips="isChip"
            label="Chips"
            :multiple="isMultiple"
            outlined />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'CommonSelectBox',
  props: {
    isMultiple: {
      type: Boolean,
      default: false,
    },
    isChip: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      value: '',
    };
  },
};
</script>
