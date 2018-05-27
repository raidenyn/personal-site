import { Actions } from 'sinai';
import { ContactsState } from './state';
import { ContactsGetters } from './getters';
import { ContactsMutations } from './mutations';
import { ContactsClient, IContactsClient } from '../../clients/contacts';

export class ContactsActions extends Actions<ContactsState, ContactsGetters, ContactsMutations>() {
    private contactsClient: IContactsClient = new ContactsClient();

    async load () {
        if (!this.state.list || this.state.list.length === 0) {
            const contacts = await this.contactsClient.list();
            this.mutations.set(contacts);
        }
    }
}
