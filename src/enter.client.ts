import createApp from './enter.base';
import VueRouter from 'vue-router';

import './sass/main.scss';

declare global {
    interface Window {
        __INITIAL_STATE__?: any;
    }
}

export const app = createApp();

if (window.__INITIAL_STATE__) {
    app.$store.replaceState(window.__INITIAL_STATE__);
    delete window.__INITIAL_STATE__;
}

app.$mount('#app-outlet');
