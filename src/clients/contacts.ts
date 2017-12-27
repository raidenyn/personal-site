import { http } from './http';

export interface IContactsClient {
    list(): Promise<IContact[]>;
}

export class ContactsClient implements IContactsClient {
    private http = http;

    public list() {
        return this.http.get('/data/contacts.json')
                        .then(response => response.data);
    }
}

export interface IContact {
    id: string;
    scope?: 'fas' | 'fab';
    text: string;
    link: string;
}
