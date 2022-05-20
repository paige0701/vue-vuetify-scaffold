<template>
  <div>
    <v-list-item
      :key="item.title"
      link
      :to="item.to">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  name: 'DefaultListItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
