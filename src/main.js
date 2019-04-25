import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './routes/'
import Vuex from 'vuex';
import { store } from './store/';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import i18n from './i18n'
import './registerServiceWorker'
Vue.use(Vuex);
Vue.use(BootstrapVue);
const defaultStore = new Vuex.Store(store);

new Vue({
  el: '#app',
  router,
  i18n,
  store:defaultStore,
  render: h => h(App)
})
