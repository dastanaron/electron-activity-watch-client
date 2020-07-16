import Vue from 'vue';
import * as ElementUI from 'element-ui';
import router from './router';
import store from './store';
import Common from './common.vue';
import { utilsPlugin } from './plugins/Utils';
import { IPCPlugin } from './plugins/IPC';

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
    render: (h) => h(Common),
}).$mount('#app');
