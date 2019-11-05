import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
import Toast from './wxcomponents/vant-weapp/toast/toast'

Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
