import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IContact } from '../../clients/contacts';

// import { library } from '@fortawesome/fontawesome-svg-core';

import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

const icons = {
    linkedin: faLinkedin,
    github: faGithub,
    envelope: faEnvelope,
};

@Component({
    name: 'contact',
    components: {
        'font-awesome-icon': async () => (await import('@fortawesome/vue-fontawesome')).FontAwesomeIcon,
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
