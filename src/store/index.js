import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infoAccount : []
  },
  mutations: {
    set_infoAccount(state, value){
      state.infoAccount = value
    }
  },
  getters: {
    get_infoAccount : state => {
      return state.infoAccount
    }
  },
  modules: {
  }
})
