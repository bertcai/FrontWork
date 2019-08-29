import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from './axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')