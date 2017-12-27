import { AppStoreType } from '../store/index';
import { VueRouter, Component } from 'vue-router/types/router';
import { Route } from 'vue-router';

export async function prefetchComponents(
    store: AppStoreType, 
    router: VueRouter, 
    to: Route = router.currentRoute, 
    from?: Route,
): Promise<any[]> {
    const matched = router.getMatchedComponents(to);
    const prevMatched = from ? router.getMatchedComponents(from) : [];

    // we only care about non-previously-rendered components,
    // so we compare them until the two matched lists differ
    let diffed = false;
    const activated = matched.filter((component, i) => {
        return diffed || (diffed = (prevMatched[i] !== component));
    }).filter((component: any) => {
        return typeof component.prefetch === 'function';
    });

    if (activated.length === 0) {
        return [];
    }

    // this is where we should trigger a loading indicator if there is one
    return Promise.all(activated.map(async (component: any) => {
        const data = await component.prefetch({ store, route: to });
        return component.prefetchedData = data;
    }));
}

export function restoreComponents(
    componentStates: any[],
    router: VueRouter,
): void {
    const components = router.getMatchedComponents()
                             .filter((comp: any) => typeof comp.prefetch === 'function');

    if (componentStates.length !== components.length) {
        throw new Error('SS data is not matched to components.');
    }

    for (const index in components) {
        (components[index] as any).prefetchedData = componentStates[index];
    }
}
