// tslint:disable:no-unused-expression
import { ContactsMutations } from './mutations';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import createStore, { AppStoreType } from '../';
import '../../util/chai.pluggins';

describe('ContentModule - Mutations', () => {
    let mutations: ContactsMutations;
    let mock: MockAdapter;
    let store: AppStoreType;

    beforeEach(() => {
        mock = new MockAdapter(axios);

        store = createStore({ strict: false });

        mutations = store.mutations.contacts;
    });

    afterEach(() => {
        mock.restore();
    });

    describe('add', () => {
        let add: typeof mutations.add;

        beforeEach(() => {
            add = mutations.add;
        });

        it('should add value to the list', () => {
            store.state.contacts.list = [{ id: '1', text: 'text', link: 'link' }];

            add({ id: '2', text: 'text2', link: 'link2' });

            expect(store.state.contacts.list).is.deep.equal([
                { id: '1', text: 'text', link: 'link' },
                { id: '2', text: 'text2', link: 'link2' },
            ]);
        });
    });

    describe('pop', () => {
        let pop: typeof mutations.pop;

        beforeEach(() => {
            pop = mutations.pop;
        });

        it('should pop last value from the list', () => {
            store.state.contacts.list = [{ id: '1', text: 'text', link: 'link' }, { id: '2', text: 'text2', link: 'link2' }];

            pop();

            expect(store.state.contacts.list).is.deep.equal([{ id: '1', text: 'text', link: 'link' }]);
        });

        it("shouldn't change anything on empty list", () => {
            store.state.contacts.list = [];

            pop();

            expect(store.state.contacts.list).is.deep.equal([]);
        });
    });

    describe('set', () => {
        let set: typeof mutations.set;

        beforeEach(() => {
            set = mutations.set;
        });

        it('should set new array to the list', () => {
            const newArray = [{ id: '1', text: 'text', link: 'link' }, { id: '2', text: 'text2', link: 'link2' }];

            set(newArray);

            expect(store.state.contacts.list).is.equal(newArray);
        });
    });
});
