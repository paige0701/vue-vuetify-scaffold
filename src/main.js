import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './plugins'
import store from "@/store";
Vue.config.productionTip = false
import "@/api.js"
Vue.directive('blur', {
  inserted: function (el) {
    el.onfocus = (ev) => ev.target.blur()
  }
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
