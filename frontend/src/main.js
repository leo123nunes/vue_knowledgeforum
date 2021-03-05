import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import store from './config/store.js'
import './config/bootstrap.js'
import router from './config/routes'
import axios from 'axios'

Vue.config.productionTip = false

// TEMPORARY
axios.defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQ2FtaWxhIiwiZW1haWwiOiJjYW1pbGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkR29yaEJYd2syalM0TkppNlpzS3cyLlcvSHlpV0xyMVZ3UjY5cnZrNTZaeGpraENDdXFOUHUiLCJpZCI6MTAsImFkbWluIjpmYWxzZSwiaWF0IjoxNjE0OTUzMTYwLCJleHAiOjE4NzQxNTMxNjB9.IwM5YDdv-wWkapiGbOZ84oPj2fQNtiDlh7q-C4bkJGU'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')