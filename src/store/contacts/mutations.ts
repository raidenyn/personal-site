import { Mutations } from 'sinai';
import { ContactsState } from './state';
import { IContact } from '../../clients/contacts';

export class ContactsMutations extends Mutations<ContactsState>() {
    set (newList: IContact[]) {
        this.state.list = newList;
    }

    add (item: IContact) {
        this.state.list.push(item);
    }

    pop () {
        this.state.list.pop();
    }
}
