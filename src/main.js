import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './routes/'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import i18n from './i18n'

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
