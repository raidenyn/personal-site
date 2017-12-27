import { module } from 'sinai';
import { ContactsState } from './state';
import { ContactsGetters } from './getters';
import { ContactsMutations } from './mutations';
import { ContactsActions } from './actions';

const contactsModule = module({
    state: ContactsState,
    getters: ContactsGetters,
    mutations: ContactsMutations,
    actions: ContactsActions,
});

export type ContactsModuleStoreType = typeof contactsModule;

export default contactsModule;
