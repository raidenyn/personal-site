import createApp from './enter.base';
import { Request } from 'express';
import { Component } from 'vue-router/types/router';
import { http } from './clients/http';
import { prefetchComponents } from './util/prefetch-components';

export default (context: Request) => {
    const app = createApp();

    app.$router.push(context.url);
    context.meta = app.$meta();

    if (!http.defaults.baseURL || !/^https?:\/\//.test(http.defaults.baseURL)) {
        http.defaults.baseURL = `${context.protocol}://${context.get('host')}${(http.defaults.baseURL ? http.defaults.baseURL : '')}`;
    }

    async function preparePage() {
        const componentStates = await prefetchComponents(app.$store, app.$router);

        context.state = app.$store.state;
        (context.state as any).__INITIAL_COMPONENTS_STATE__ = componentStates;

        if (context.route) {
            if (app.$route.matched[0].path === '*') {
                context.route.statusCode = 404;
            } else {
                context.route.statusCode = 200;
            }
        }
    }

    return new Promise((resolve, reject) => {
        app.$router.onReady(async () => {
            try {
                await preparePage();
                resolve(app);
            } catch (error) {
                reject(error);
            }
        });
    });
};
