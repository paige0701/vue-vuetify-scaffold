<template>
  <v-chip
    v-if="isShow"
    class="ma-2"
    close
    :color="randomColour"
    outlined
    @click="$emit('delete')">
    {{ name }}
  </v-chip>
</template>
<script>
export default {
  name: 'CommonChip',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    randomColour() {
      return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    },
  },
};
</script>
