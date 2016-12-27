import Vue from 'vue'
import App from './App'
import EditArticle from './EditArticle'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VueResource)

import 'assets/css/bootstrap.min.css'
import 'assets/css/datepicker.css'
import 'assets/css/reader-b4ad34e3.css'
import 'assets/css/site.css'
import 'assets/css/layout.css'

const router = new VueRouter({
	routes:[
		{path:'/',component:App},
		{path:'/editArticle',component:EditArticle}
	]
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
