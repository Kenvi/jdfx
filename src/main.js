import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import 'assets/css/bootstrap.min.css'
import 'assets/css/datepicker.css'
import 'assets/css/reader-b4ad34e3.css'
import 'assets/css/site.css'
import 'assets/css/layout.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // template: '<App/>',
  components: { app:App },
  render: h => h('app')
})
