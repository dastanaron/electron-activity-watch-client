import Vue from 'vue';
import Vuex from 'vuex';
import applicationSettings from './modules/applicationSettings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        applicationSettings,
    },
});
