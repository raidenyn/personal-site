import Vue from 'vue';
import VueRouter from 'vue-router';

// register the plugin
Vue.use(VueRouter);

export default () => new VueRouter({
    routes: [
        { path: '/', component: () => import('./components/home.vue') },
        { path: '/about', component: () => import('./components/about') },
        { path: '/contacts', component: () => import('./components/contacts') },
        { path: '*', component: () => import('./components/not-found') },
    ],
    mode: 'history',
});
