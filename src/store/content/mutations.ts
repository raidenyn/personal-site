import { Mutations } from 'sinai';
import { ContentState, IContactItem } from './state';

export class ContentMutations extends Mutations<ContentState>() {
    set (newList: IContactItem[]) {
        this.state.list = newList;
    }

    add (item: IContactItem) {
        this.state.list.push(item);
    }

    pop () {
        this.state.list.pop();
    }
}
