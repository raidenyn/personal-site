import Vue from 'vue';

export function renderPureClient(app: Vue) {
    app.$mount('#app-outlet', /* hydrating: */ false);
}
