export function registerServiceWorker(): void {
    const serviceWorker = getServiceWorker();

    if (!serviceWorker) {
        return;
    }

    window.addEventListener('load', () => {
        serviceWorker.register(`/sw-${LANG}.js`);
    });
}

function getServiceWorker(): ServiceWorkerContainer | undefined {
    return window
           && window.navigator
           && window.navigator.serviceWorker
           || undefined;
}
