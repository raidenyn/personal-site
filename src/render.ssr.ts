
import { restoreComponents, prefetchComponents } from './util/prefetch-components';
import Vue from 'vue';

interface InitialState {
    __INITIAL_COMPONENTS_STATE__?: any[];
}

declare global {
    interface Window {
        __INITIAL_STATE__?: InitialState;
    }
}

function readStateOnce() {
    const state = window.__INITIAL_STATE__;
    delete window.__INITIAL_STATE__;
    return state;
}

export function renderSsrHydration(app: Vue, state: InitialState | undefined = readStateOnce()): Promise<void> {
    if (!state) {
        return Promise.reject('No state');
    }

    const componentStates = state.__INITIAL_COMPONENTS_STATE__;
    delete state.__INITIAL_COMPONENTS_STATE__;

    app.$store.replaceState(state as any);

    return new Promise((resolve, reject) => {
        if (componentStates) {
            app.$router.onReady(() => {
                try {
                    restoreComponents(componentStates, app.$router);

                    app.$router.beforeResolve((to, from, next) => {
                        return prefetchComponents(app.$store, app.$router, to, from).then(next as any, next);
                    });

                    app.$mount('#app-main', /* hydrating: */ true);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, reject);
        }
    });
}
