import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store.js'
import './config/msgs.js'
import './config/bootstrap.js'
import router from './config/routes'
import axios from 'axios'

Vue.config.productionTip = false

// TEMPORARY
axios.defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTGVvbmFyZG8iLCJlbWFpbCI6Imxlb25hcmRvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJC9FREJaUm5BTm9sdktDOXM3aUdjdGVGaTNYUjJKQm5Lbk1JTm85eVFzSFdNRDRFNTBHRlhtIiwiaWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2MTUxMjYxMDcsImV4cCI6MTg3NDMyNjEwN30.oQnHVl0qHBA501A1gDMWwYVN-ZTNxh7um3JxdT9X53w'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')