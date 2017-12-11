// tslint:disable:no-unused-expression
import { ContentActions } from './actions';
import { expect } from 'chai';
import MockAdapter = require('axios-mock-adapter');
import contentModule from './';
import createStore, { AppStoreType } from '../';
import '../../util/chai.pluggins';
import { http } from '../../http';

describe('ContentModule - Actions', () => {
    let actions: ContentActions;
    let mock: MockAdapter;
    let store: AppStoreType;

    beforeEach(() => {
        mock = new MockAdapter(http);

        store = createStore({ strict: false });

        actions = store.actions.content;
    });

    afterEach(() => {
        mock.restore();
    });
    
    describe('load', () => {
        let load: typeof actions.load;

        beforeEach(() => {
            load = actions.load;
        });

        it('should load data from remote server', async () => {
            mock.onGet().reply(200, [
                { id: 1, name: 'John Smith' },
            ]);

            await load();

            expect(store.state.content.list).is.deep.equal([{ id: 1, name: 'John Smith' }]);
        });

        it('should rise error on server error response', () => {
            mock.onGet().reply(500);

            expect(load()).to.eventually.be.rejected;
        });
    });
});
