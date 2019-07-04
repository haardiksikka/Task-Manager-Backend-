import Vue from 'vue';
import Vuex from 'vuex';
import task from './index';
import category from './category';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    task,
    category,
  },
});
