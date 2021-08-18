<template>
  <div>
    <v-app>
      <v-app-bar
        app
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', to:"/" },
        { title: 'Profile', icon: 'mdi-image', to:"/profile" },
        { title: 'About', icon: 'mdi-help-box', to:"/about" },
        { title: 'GridSystem', icon: 'mdi-help-box', to:"/grid-system" },
        { title: 'GridListPage', icon: 'mdi-help-box', to:"/grid-list-page" },
        { title: 'Breakpoints', icon: 'mdi-help-box', to:"/breakpoints" },
        { title: 'Typography', icon: 'mdi-help-box', to:"/typography" },
        { title: 'HelperClasses', icon: 'mdi-help-box', to:"/helper-classes" },
        { title: 'SignIn', icon: 'mdi-login', to:"/authentication/sign-in" },
        { title: 'SignUp', icon: 'mdi-account-plus', to:"/authentication/sign-up" },
        { title: 'ProductList', icon: 'mdi-format-list-bulleted', to:"/page/product-list" },      ],
    }
  }
}
</script>
