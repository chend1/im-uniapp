import Vue from 'vue'
import Vuex from 'vuex'
import sessionModule from './modules/session.js'
import addressModule from './modules/address.js'
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		userInfo: {}
	},
	mutations: {

	},
	actions: {

	},

	modules: {
		session: sessionModule,
		address: addressModule
	}
})
export default store
