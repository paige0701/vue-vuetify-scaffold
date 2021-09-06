<template>
  <div>
    <v-app>
      <DefaultBar @drawer="drawer = !drawer" />
      <DefaultDrawer v-model="drawer" />
      <v-main>
        <DefaultView />
      </v-main>
      <DefaultBottomBar v-if="$vuetify.breakpoint.mobile" />
    </v-app>
  </div>
</template>
<script>
import DefaultBar from './Appbar'
import DefaultDrawer from "@/layouts/default/Drawer";
import DefaultView from "@/layouts/default/View";
import DefaultBottomBar from '@/layouts/default/BottomBar'
export default {
  name: 'DefaultLayout',
  components: {
    DefaultDrawer,
    DefaultBar,
    DefaultView,
    DefaultBottomBar,
  },
  data() {
    return {
      drawer: false,
    }
  }
}
</script>
