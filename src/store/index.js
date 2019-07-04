/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
import axios from 'axios';


const state = {
  userTasks: [],
};
const mutations = {
  addToTask: (state, tasks) => {
    state.userTasks = [];
    tasks.forEach((task) => {
      task.TaskDomain = task.TaskCategory.CategoryName;
      state.userTasks.push(task);
    });
  },
};
const actions = {
  getTaskData({ commit }) {
    const token = sessionStorage.getItem('user');
    if (token !== 'undefined') {
      axios.get(`http://localhost:53653/usertask/${token}`)
        .then((result) => {
          const r = result.data[0].Tasks;
          commit('addToTask', r);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log('errr from getTaskData');
    }
  },
};
const getters = {
  userTasks: (state) => {
    return state.userTasks;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
