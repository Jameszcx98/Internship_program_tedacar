import Vue from 'vue'
import App from './App'
import $http from './utils/request.js'

import cuCustom from './components/cu-custom.vue'
Vue.component('cu-custom',cuCustom) // 使用封装的导航栏

import footMenu from './components/footMenu.vue'
Vue.component('footMenu',footMenu) // 使用封装的底部公共组件

const Parse = require('./common/parse.js')
Parse.initialize("Teda")
// Parse.serverURL = 'http://localhost:1337/parse'
Parse.serverURL = 'https://teda-parse.wudizu.com/parse'
import i18n from './i18n.js'
// ssaeee s
Vue.prototype._i18n = i18n

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)

//引入store
import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;
Vue.prototype.$http = $http;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})

app.$mount()

export default {
	// 这个字段走 app.json

}
