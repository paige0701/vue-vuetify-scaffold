import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';

import {
  digits,
  email,
  max,
  numeric,
  required,
  confirmed,
} from 'vee-validate/dist/rules';

extend('max', max);
extend('required', required);
extend('numeric', numeric);
extend('digits', digits);
extend('email', email);
extend('confirmed', confirmed);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
