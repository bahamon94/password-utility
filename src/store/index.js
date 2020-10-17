import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infoAccount : [],
    dataAccounts : []
  },
  mutations: {
    set_infoAccount(state, value){
      state.infoAccount = value
    },
    set_accounts(state, value){
      state.dataAccounts = value
    },
  },
  getters: {
    get_infoAccount : state => {
      return state.infoAccount
    },
    get_accounts : state => {
      return state.dataAccounts
    }
  },
  modules: {
  }
})
