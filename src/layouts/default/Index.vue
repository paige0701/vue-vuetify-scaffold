<template>
  <div>
    <v-app>
      <DefaultBar @drawer="drawer = !drawer" />
      <DefaultDrawer v-model="drawer" />
      <v-main>
        <DefaultView />
      </v-main>
    </v-app>
  </div>
</template>
<script>
import DefaultBar from './Appbar'
import DefaultDrawer from "@/layouts/default/Drawer";
import DefaultView from "@/layouts/default/View";
export default {
  name: 'DefaultLayout',
  components: {
    DefaultDrawer,
    DefaultBar,
    DefaultView
  },
  data() {
    return {
      drawer: false,
    }
  }
}
</script>
