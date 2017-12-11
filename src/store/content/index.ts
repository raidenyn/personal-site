import { module } from 'sinai';
import { ContentState } from './state';
import { ContentGetters } from './getters';
import { ContentMutations } from './mutations';
import { ContentActions } from './actions';

const contentModule = module({
    state: ContentState,
    getters: ContentGetters,
    mutations: ContentMutations,
    actions: ContentActions,
});

export type ContentModuleStoreType = typeof contentModule;

export default contentModule;
