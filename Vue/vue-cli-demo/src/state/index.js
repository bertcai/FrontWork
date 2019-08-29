import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 90
    },
    getters: {
        getCount(state) {
            return state.count > 0 ? state.count : 0
        }
    },
    mutations: {
        increase(state) {
            state.count++
        },
        decrease(state) {
            state.count -= 50
        }
    },
    actions: {
        increaseAct(context) {
            context.commit('increase')
        }
    }
})