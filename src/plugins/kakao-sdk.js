import Vue from 'vue';
import VueKakaoSdk from 'vue-kakao-sdk';
const apiKey = process.env.VUE_APP_ENV_KAKAO_SDK_API_KEY;
Vue.use(VueKakaoSdk, { apiKey: apiKey }); // apiKey 를 반드시 입력해줘야한다.
