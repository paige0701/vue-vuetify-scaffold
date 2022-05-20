const state = {
  items: [
    { title: 'Home', icon: 'mdi-view-dashboard', to: '/' },
    { title: 'Calendar', icon: 'mdi-calendar-month', to: '/calendar-view' },
    { title: 'Workouts', icon: 'mdi-format-list-bulleted', to: '/workouts' }, // {
    //   title: 'Pages', icon: 'mdi-menu', items: [
    //     {
    //       title: 'Authentication', icon: 'mdi-login', items: [
    //         {title: 'SignIn', icon: 'mdi-login', to: "/authentication/sign-in"},
    //         {title: 'SignUp', icon: 'mdi-account-plus', to: "/authentication/sign-up"},
    //       ]
    //     },
    //     {title: 'ProductList', icon: 'mdi-format-list-bulleted', to: "/product-list"}
    //   ]
    // },
    // {title: 'BestSellers', icon: 'mdi-book', to: "/best-sellers"},
    //
    // {title: 'GridSystem', icon: 'mdi-help-box', to: "/grid-system"},
    // {title: 'GridListPage', icon: 'mdi-help-box', to: "/grid-list-page"},
    // {title: 'Breakpoints', icon: 'mdi-help-box', to: "/breakpoints"},
    // {title: 'Typography', icon: 'mdi-help-box', to: "/typography"},
    // {title: 'HelperClasses', icon: 'mdi-help-box', to: "/helper-classes"},
  ],
  drawer: true,
};

const mutations = {
  setDrawer(state, data) {
    state.drawer = data;
  },
};

const getters = {
  getDrawer: (state) => state.drawer,
};

const actions = {
  toggleDrawer({ commit }, value) {
    commit('setDrawer', value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
