import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { AppStoreType } from '../../store/index';
import { Route } from 'vue-router';
import { IContact } from '../../clients/contacts';

import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const icons = {
    linkedin: faLinkedin,
    github: faGithub,
    envelope: faEnvelope,
};

@Component({
    name: 'contact',
    components: {
        'font-awesome-icon': () => import('@fortawesome/vue-fontawesome'),
    },
    beforeCreate: () => {},
    serverCacheKey: (props: ContactComponent) => props.contact.id,
})
export class ContactComponent extends Vue {
    @Prop({
        required: true,
    })
    public contact: IContact;

    public render(h) {
        return <li class="p-3">
                    <a href={this.contact.link}>
                        <font-awesome-icon icon={icons[this.contact.id]} width="15px" />&nbsp;
                        {this.contact.text}
                    </a>
               </li>;
    }
}
