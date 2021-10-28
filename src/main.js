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

// main.js
import VueKakaoSdk from 'vue-kakao-sdk'
const apiKey = process.env.VUE_APP_ENV_KAKAO_SDK_API_KEY
Vue.use(VueKakaoSdk, { apiKey: apiKey }) // apiKey 를 반드시 입력해줘야한다.
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
