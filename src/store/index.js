import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userTasks: [],
  },
  mutations: {
    addToTask(state, task) {
      state.userTasks.push(task);
    },
  },
});
