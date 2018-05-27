import Vue from 'vue';
import { install, module, store } from 'sinai';
import contacts from './contacts';
import { ContactsState } from './contacts/state';
import { VueStore } from 'sinai/lib/vue';
import { returnType } from '../util/return-type';

Vue.use(install);

const createStore = ({ strict } = { strict: ENVIRONMENT.MODE !== 'production' }) => {
    const root = module().child('contacts', contacts);

    return store(root, {
        strict,
    });
};

export default createStore;

export interface IAppState {
    contacts: ContactsState;
}

const appStore = returnType(createStore);

export type AppStoreType = typeof appStore;

declare module 'vue/types/vue' {
    interface Vue {
        $store: AppStoreType;
    }
}
