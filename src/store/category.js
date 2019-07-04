/* eslint-disable no-shadow */
import axios from 'axios';

const state = {
  categories: [],
};
const mutations = {
  addToCategory: (state, category) => {
    state.categories = [];
    category.forEach((c) => {
      state.categories.push(c);
    });
  },
};
const getters = {
  taskCategories: state => state.categories,
};
const actions = {
  getCategories({ commit }) {
    axios.get('http://localhost:53653/getcategories')
      .then((result) => {
        commit('addToCategory', result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
