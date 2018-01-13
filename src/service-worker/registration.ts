export function registerServiceWorker(): void {
    const serviceWorker = getServiceWorker();

    if (!serviceWorker) {
        return;
    }

    serviceWorker.register('/sw.js');
}

function getServiceWorker(): ServiceWorkerContainer | undefined {
    return window 
           && window.navigator
           && window.navigator.serviceWorker
           || undefined;
}
