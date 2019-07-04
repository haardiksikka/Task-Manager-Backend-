import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(router);

new Vue({
  Vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
