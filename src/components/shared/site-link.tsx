import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export class SiteLinkComponent extends Vue {
    @Prop({
        required: true,
    })
    public href: string;

    public render(h) {
        if (this.$route.path === this.href) {
            return <span>{ this.$slots.default }</span>;
        }
        return <router-link to={ this.href }>
                 { this.$slots.default }
               </router-link>;
    }
}
