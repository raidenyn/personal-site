import createApp from './enter.base';
import VueRouter from 'vue-router';

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
            const comps = app.$router.getMatchedComponents().filter((comp: any) => typeof comp.prefetch === 'function');

            for (const index in componentStates) {
                (comps[index] as any).prefetchedData = componentStates[index];
            }
        });
    }
}

app.$mount('#app-outlet');
