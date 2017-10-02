import Vue from 'vue'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import App from './App'
import { store } from './store'
import router from './router'
import DateFilter from './filter/date'
import Alert from './components/Shared/Alert'
import EditMDTDialog from './components/Meetup/Edit/EditMeetupDetailDialog'
import EditMDDDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import EditMDTMDialog from './components/Meetup/Edit/EditMeetupTimeDialog'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog'

firebase.initializeApp(process.env.FIREBASE)

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-meetup-detail-dialog', EditMDTDialog)
Vue.component('app-edit-meetup-date-dialog', EditMDDDialog)
Vue.component('app-edit-meetup-time-dialog', EditMDTMDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
