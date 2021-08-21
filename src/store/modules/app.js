const state = {
  items: [
    {title: 'Dashboard', icon: 'mdi-view-dashboard', to: "/"},
    {
      title: 'Pages', icon: 'mdi-menu', items: [
        {
          title: 'Authentication', icon: 'mdi-login', items: [
            {title: 'SignIn', icon: 'mdi-login', to: "/authentication/sign-in"},
            {title: 'SignUp', icon: 'mdi-account-plus', to: "/authentication/sign-up"},
          ]
        },
        {title: 'ProductList', icon: 'mdi-format-list-bulleted', to: "/page/product-list"}
      ]
    },
    {title: 'Profile', icon: 'mdi-image', to: "/profile"},
    {title: 'About', icon: 'mdi-help-box', to: "/about"},
    {title: 'GridSystem', icon: 'mdi-help-box', to: "/grid-system"},
    {title: 'GridListPage', icon: 'mdi-help-box', to: "/grid-list-page"},
    {title: 'Breakpoints', icon: 'mdi-help-box', to: "/breakpoints"},
    {title: 'Typography', icon: 'mdi-help-box', to: "/typography"},
    {title: 'HelperClasses', icon: 'mdi-help-box', to: "/helper-classes"},
  ],
  drawer: true,
}

const mutations = {
  setDrawer (state, data) {
    state.drawer = data
  }
}

const getters = {
  getDrawer: state => state.drawer
}

const actions = {
  toggleDrawer ({ commit }, value) {
    commit('setDrawer', value)
  }
}

export default {
  namespaced: true,
  state, getters, actions, mutations
}
