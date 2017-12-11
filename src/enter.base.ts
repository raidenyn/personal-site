import Vue from 'vue';
import * as Meta from 'vue-meta';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

import createRouter from './router';
import createStore from './store';
import app from './app.vue';
import { sync } from 'vuex-router-sync';

import './types/env';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Meta, {
    ssrAttribute: 'meta-ssr',
});

export default () : Vue => {
    const router = createRouter();
    const store = createStore();

    return new Vue({
        store,
        router,
        ...app,   
    } as any);
};
