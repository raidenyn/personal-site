import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Link } from './link';
import { Logger } from '../../util/log';
import { SiteLinkComponent } from '../shared/site-link';

@Component({
    name: 'navbar',
    components: {
        'site-link': SiteLinkComponent,
    },
})
export class NavbarComponent extends Vue {
    public links: Link[] = [
        new Link('$lang-en(Home)$lang-ru(Главная)', '/'),
        new Link('$lang-en(About)$lang-ru(О сайте)', '/about'),
        new Link('$lang-en(Contacts)$lang-ru(Контакты)', '/contacts'),
    ];

    protected logger: Logger;

    @Watch('$route.path')
    public pathChanged() {
        this.logger.info('Changed current path to: ' + this.$route.path);
    }

    public mounted() {
        if (!this.logger) this.logger = new Logger();
    }

    public render(h) {
        return <ul class="navbar-nav">
                {
                    this.links.map((link) => {
                        return <li class={{ active : this.$route.path === link.path, 'nav-item': true }}>
                                    <site-link class="nav-link" href={ link.path }>
                                        { link.name }
                                    </site-link>
                               </li>;
                    })
                }
                </ul>;
    }
}
