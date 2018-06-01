import createApp from './enter.base';
import VueRouter from 'vue-router';
import { restoreComponents, prefetchComponents } from './util/prefetch-components';
import { registerServiceWorker } from './service-worker/registration';

import './sass/main.scss';

declare global {
    interface Window {
        __INITIAL_STATE__?: {
            __INITIAL_COMPONENTS_STATE__?: any[],
        };
    }
}

export const app = createApp();

const state = window.__INITIAL_STATE__;
if (state) {
    const componentStates = state.__INITIAL_COMPONENTS_STATE__;
    delete state.__INITIAL_COMPONENTS_STATE__;

    app.$store.replaceState(state as any);
    delete window.__INITIAL_STATE__;

    if (componentStates) {
        app.$router.onReady(() => {
            restoreComponents(componentStates, app.$router);

            app.$router.beforeResolve((to, from, next) => {
                return prefetchComponents(app.$store, app.$router, to, from).then(next as any, next);
            });

            app.$mount('#app-main', /* hydrating: */ true);
        });
    }
} else {
    app.$mount('#app-outlet', /* hydrating: */ false);
}

if (ENVIRONMENT.MODE === 'production') {
    registerServiceWorker();
}
