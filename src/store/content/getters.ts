import { Getters } from 'sinai';
import { ContentState } from './state';

export class ContentGetters extends Getters<ContentState>() {
    get count () {
        return this.state.list.length;
    }
}
