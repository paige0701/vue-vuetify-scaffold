<template>
  <v-navigation-drawer
    v-model="drawer"
    v-bind="$attrs"
    app>
    <default-drawer-header />
    <v-divider />
    <default-list :items="items" />
  </v-navigation-drawer>
</template>
<script>
import DefaultDrawerHeader from '@/layouts/default/DrawerHeader';
import DefaultList from '@/layouts/default/List';
import { mapState } from 'vuex';
export default {
  name: 'DefaultDrawer',
  components: {
    DefaultDrawerHeader,
    DefaultList,
  },
  computed: {
    ...mapState('app', ['items']),
    drawer: {
      get() {
        return this.$store.getters['app/getDrawer'];
      },
      set(value) {
        return this.$store.commit('app/setDrawer', value);
      },
    },
  },
};
</script>
