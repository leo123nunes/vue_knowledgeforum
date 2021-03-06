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
axios.defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9uYXRoYW4iLCJlbWFpbCI6ImpvbmF0aGFuQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHQza3pqMmdoeFBlMUdmTjJSbHdBNXVvWGM1UVRRb2s2dFUwT2hQbTA2WGhpRUpiTzg0NXVLIiwiaWQiOjksImFkbWluIjp0cnVlLCJpYXQiOjE2MTQ5NjgzOTMsImV4cCI6MTg3NDE2ODM5M30.ri0YYd1gDYBxBO7xkg64Pn_ckLm6Gb0S3cCbL_DqEQc'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')