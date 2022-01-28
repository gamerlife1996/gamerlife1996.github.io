import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: ''
  },
  mutations: {
    updateSearch(state, value) {
      state.search = value
    }
  },
  actions: {
  },
  modules: {
  }
})
