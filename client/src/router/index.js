import Vue from 'vue';
import Router from 'vue-router';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import NotFound from '../components/NotFound.vue';
import * as services from '../services';

Vue.use(Router);

function requireAuth(to, from, next) {
  if (window.localStorage.getItem('feathers-jwt') === null) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: requireAuth
    }, {
      path: '/signup',
      component: Signup
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/logout',
      beforeEnter(to, from, next) {
        services.app.logout();
        next('/login')
      }
    }, {
      path: '*',
      component: NotFound
    }
  ]
});
