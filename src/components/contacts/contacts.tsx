import Vue from 'vue';
import Component from 'vue-class-component';
import { AppStoreType } from '../../store/index';
import { Route } from 'vue-router';
import { faLinkedin, faGithub } from '@fortawesome/fontawesome-free-brands';
import { faEnvelope } from '@fortawesome/fontawesome-free-solid';
import { IContact } from '../../clients/contacts';

import './contacts.scss';

const icons = {
    linkedin: faLinkedin,
    github: faGithub,
    envelope: faEnvelope,
};

@Component({
    metaInfo: {
        title: '$lang-en(Contacts)$lang-ru(Контактная информация)',
    },
})
export class ContactsComponent extends Vue {
    public static prefetch ({ store, route }: { store: AppStoreType, route: Route }) {
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
                        {this.items.map(item => this.item(item))}
                    </ul>
                </div>;
    }
    
    private item(item: IContact) {
        return <li class="p-3">
                    <a href={item.link}>
                        <font-awesome-icon icon={icons[item.id]} width="15px" />&nbsp;
                        {item.text}
                    </a>
               </li>;
    }
}
