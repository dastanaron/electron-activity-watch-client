import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './views/home.vue';
import Dashboard from './views/dashboard.vue';
import Settings from './views/settings.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/settings', name: 'Settings', component: Settings},
];

export default new VueRouter({
  routes,
});
