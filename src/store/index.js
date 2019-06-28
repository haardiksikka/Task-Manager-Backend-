import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userTasks: [],
  },
  mutations: {
    addToTask(state, tasks) {
      state.userTasks = [];
      console.log(tasks);
      tasks.forEach(task => state.userTasks.push(task));
    },
  },
  actions: {
    getTaskData({ commit }) {
      const token = sessionStorage.getItem('user');
      axios.get(`https://localhost:44389/api/task/usertask?email=${token}`)
        .then((result) => {
          commit('addToTask', result.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
