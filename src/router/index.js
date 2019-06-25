import Vue from 'vue';
import Router from 'vue-router';
import Login from '../Login/login.vue';
import Register from '../Register/register.vue';
import Home from '../Home/Home.vue';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '*',
    redirect: '/',
  },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user');
  if (to.fullPath === '/home') {
    if (user == null) {
      next('/login');
    }
  }
  if (to.fullPath === '/') {
    if (user != null) {
      next('/home');
    }
  }
  next();
});

export default router;
