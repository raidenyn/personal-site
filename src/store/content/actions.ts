import { Actions } from 'sinai';
import { ContentState } from './state';
import { ContentGetters } from './getters';
import { ContentMutations } from './mutations';
import { http } from '../../http';

export class ContentActions extends Actions<ContentState, ContentGetters, ContentMutations>() {
    private http = http;

    async load () {
        const response = await this.http.get('/data/contacts.json');
        
        this.mutations.set(response.data);
    }
}
