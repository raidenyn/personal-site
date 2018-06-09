// tslint:disable:no-unused-expression
import { ContactsGetters } from './getters';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import contentModule from './';
import createStore, { AppStoreType } from '../';
import '../../util/chai.pluggins';

describe('ContentModule - Getters', () => {
    let getters: ContactsGetters;
    let mock: MockAdapter;
    let store: AppStoreType;

    beforeEach(() => {
        mock = new MockAdapter(axios);

        store = createStore({ strict: false });

        getters = store.getters.contacts;
    });

    afterEach(() => {
        mock.restore();
    });

    describe('count', () => {
        let count: typeof getters.count;

        beforeEach(() => {
            count = getters.count;
        });

        it('should return length of list', () => {
            store.state.contacts.list = ['', ''] as any;

            expect(getters.count).is.equal(2);

            store.state.contacts.list = ['', '', ''] as any;

            expect(getters.count).is.equal(3);
        });
    });
});
