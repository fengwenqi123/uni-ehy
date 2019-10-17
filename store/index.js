import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import certificate from './modules/certificate'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
	certificate
  },
  getters
})

export default store
