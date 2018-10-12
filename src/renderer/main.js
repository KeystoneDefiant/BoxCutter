import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import '@/styles/_globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
var boxcutter = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
