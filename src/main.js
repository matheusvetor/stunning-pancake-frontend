// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import Datetime from 'vue-datetime'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import './main.css'
import 'vue-datetime/dist/vue-datetime.css'

Vue.config.productionTip = false

Vue.use(Datetime)
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})
