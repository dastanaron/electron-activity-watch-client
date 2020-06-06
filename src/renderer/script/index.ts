import Vue from 'vue';
import * as ElementUI from 'element-ui';
import router from './router';
import store from './store';
import App from './app.vue';
import {utilsPlugin} from './plugins/Utils';
import {IPCPlugin} from "./plugins/IPC";

Vue.use(ElementUI);
Vue.use(utilsPlugin);
Vue.use(IPCPlugin);

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
