import { Getters } from 'sinai';
import { ContactsState } from './state';

export class ContactsGetters extends Getters<ContactsState>() {
    get count () {
        return this.state.list.length;
    }
}
