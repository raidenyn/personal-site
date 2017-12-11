import Vue from 'vue';
import Component from 'vue-class-component';
import { AppStoreType } from '../../store/index';
import { Route } from 'vue-router';
import { IContactItem } from '../../store/content/state';
import { faLinkedin, faGithub } from '@fortawesome/fontawesome-free-brands';
import { faEnvelope } from '@fortawesome/fontawesome-free-solid';

import './contacts.scss';

@Component({
    metaInfo: {
        title: '$lang-en(Contacts)$lang-ru(Контактная информация)',
    },
})
export class ContactsComponent extends Vue {
    public readonly icons = {
        linkedin: faLinkedin,
        github: faGithub,
        envelope: faEnvelope,
    };
    
    public static asyncData ({ store, route }: { store: AppStoreType, route: Route }) {
        // return Promise from the action
        return store.actions.content.load();
    }
    
    public get items() { return this.$store.state.content.list; }

    public render(h) {
        return <div>
                    <h1 lang="en">Contacts</h1>
                    <h1 lang="ru">Контактная информация</h1>
                    <ul class="list-unstyled contacts">
                        {this.items.map(item => this.item(item))}
                    </ul>
                </div>;
    }
    
    private item(item: IContactItem) {
        return <li class="p-3">
                    <a href={item.link}>
                        <font-awesome-icon icon={this.icons[item.id]} width="15px" />&nbsp;
                        {item.text}
                    </a>
               </li>;
    }

    private mounted() {
        if (this.items.length <= 0) {
            this.loadItems();
        }
    }

    private async loadItems() {
        await this.$store.actions.content.load();
    }
}
