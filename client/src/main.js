// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import * as firebase from 'firebase';
import router from './router'

Vue.config.productionTip = false
const config = {
  apiKey: 'AIzaSyA1_GmSaCxf1gxPRC-11NmW5niDIaaO3KE',
  databaseURL: 'https://fir-lecture-77a47.firebaseio.com',
  projectId: 'fir-lecture-77a47'
}
const firebaseApp = firebase.initializeApp(config)

Vue.prototype.$db = firebaseApp.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
