import Vue from 'vue';
import { AppStoreType } from '../store/index';
import { Route } from 'vue-router';

declare module 'vue/types/vue' {
    interface Vue {
        prefetching?: boolean;

        prefetch?({ store, route }: { store: AppStoreType, route: Route }): Promise<any>;
    }
}
