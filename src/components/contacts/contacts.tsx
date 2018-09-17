import Vue from 'vue';
import Component from 'vue-class-component';
import { AppStoreType } from '../../store/index';
import { Route } from 'vue-router';
import { ContactComponent } from './contact';

import './contacts.scss';

@Component({
    metaInfo: {
        title: '$lang-en(Contacts)$lang-ru(Контактная информация)',
    },
    name: 'contacts',
    serverCacheKey: props => '-',
    components: {
        contact: ContactComponent,
    },
})
export default class ContactsComponent extends Vue {
    public static prefetch ({ store }: { store: AppStoreType, route: Route }) {
        // return Promise from the action
        return store.actions.contacts.load();
    }

    public get items() {
        return this.$store.state.contacts.list;
    }

    public render(h) {
        return <div>
                    <h1 lang="en">Contacts</h1>
                    <h1 lang="ru">Контактная информация</h1>
                    <ul class="contacts">
                        {this.items.map(item => <contact contact={ item } />)}
                    </ul>
                </div>;
    }
}
