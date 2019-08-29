import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from './axios'
import store from './state/index.js'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')