import Vue from 'vue'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import App from './App'
import { store } from './store'
import router from './router'
import DateFilter from './filter/date'
import Alert from './components/Shared/Alert'

firebase.initializeApp(process.env.FIREBASE)

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
