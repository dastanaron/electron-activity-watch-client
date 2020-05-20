import Vue from 'vue';
import router from './router';
import store from './store';
import App from './app.vue';

declare global {
  interface Window {
    vm: any;
  }
}

window.vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
