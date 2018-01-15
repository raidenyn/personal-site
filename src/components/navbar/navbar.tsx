import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Link } from './link';
import { Logger } from '../../util/log';

@Component({
    name: 'navbar',
    serverCacheKey: props => '-',
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
    pathChanged() {
        this.logger.info('Changed current path to: ' + this.$route.path);
    }

    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info(this.object.default));
    }

    render(h) {
        return <ul class="navbar-nav">
                {
                    this.links.map((link) => {
                        return <li class={{ active : this.$route.path === link.path, 'nav-item': true }}>
                                    {this.link(link)}
                               </li>;
                    })
                }
                </ul>;
    }

    link(link: Link) {
        if (this.$route.path === link.path) {
            return <span class="nav-link">{link.name}</span>;
        }
        return <router-link to={ link.path } class="nav-link">
                 {link.name}
               </router-link>;
    }
}
