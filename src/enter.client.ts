import createApp from './enter.base';
import { registerServiceWorker } from './service-worker/registration';
import { renderSsrHydration } from './render.ssr';
import { renderPureClient } from './render.spa';

export const app = createApp();

renderSsrHydration(app).catch(() => {
    renderPureClient(app);
});

if (ENVIRONMENT.MODE === 'production') {
    registerServiceWorker();
}
