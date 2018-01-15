import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Link } from './link';
import { Logger } from '../../util/log';
import { SiteLinkComponent } from '../shared/site-link';

@Component({
    name: 'navbar',
    serverCacheKey: props => '-',
    components: {
        'site-link': SiteLinkComponent,
    },
})
export class NavbarComponent extends Vue {
    public inverted: boolean = true; // default value

    public object = { 
        default: 'Default object property!',
    }; // objects as default values don't need to be wrapped into functions

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
        this.$nextTick(() => this.logger.info(this.object.default));
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
