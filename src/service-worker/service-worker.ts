import workbox from 'workbox-sw';
import { matchExtensions } from './utils/match-extensions';

const sw = self as any as ServiceWorkerGlobalScope;

workbox.setConfig({
    debug: SW_ENVIRONMENT.DEBUG_MODE,
});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
sw.__precacheManifest = sw.__precacheManifest || [];
workbox.precaching.suppressWarnings(false);
workbox.precaching.precacheAndRoute(sw.__precacheManifest, {});

// unhased images should be returned as soon as possible, but also should be revalidated on server
workbox.routing.registerRoute(
    matchExtensions(
        ['svg', 'jpe?g', 'png'],
    ),
    workbox.strategies.staleWhileRevalidate(),
    'GET');
// hashed scripts and styles should be always used from cashe
workbox.routing.registerRoute(
    matchExtensions(
        ['js', 'css'],
    ),
    workbox.strategies.cacheFirst(),
    'GET');
// other data should be loaded from server at first
workbox.routing.registerRoute(/.*/, workbox.strategies.networkFirst(), 'GET');
