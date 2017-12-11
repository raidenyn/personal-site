import Vue from 'vue';
import { install, module, store } from 'sinai';
import content from './content';
import { ContentState } from './content/state';
import { VueStore } from 'sinai/lib/vue';
import { returnType } from '../util/return-type';

Vue.use(install);

const createStore = ({ strict } = { strict: ENVIRONMENT.MODE !== 'production' }) => {
    const root = module().child('content', content);
    
    return store(root, {
        strict,
    });
};

export default createStore;

export interface IAppState {
    content: ContentState;
}

const appStore = returnType(createStore);

export type AppStoreType = typeof appStore;

declare module 'vue/types/vue' {
    interface Vue {
        $store: AppStoreType;
    }
}
