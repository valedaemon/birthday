import Vue from 'vue';
import router from './router';
import Materials from 'vue-materials';
import Filters from 'vue2-filters';
import SimpleVueValidation from 'simple-vue-validator';
import App from './components/App';

Vue.use(Materials);
Vue.use(Filters);
Vue.use(SimpleVueValidation);

Vue.component('input-tag', require('vue-input-tag'));

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app');
