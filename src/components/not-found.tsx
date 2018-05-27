import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    metaInfo: {
        title: 'Not Found',
    },
    name: 'not-found',
    serverCacheKey: props => '-',
})
export default class NotFoundPage extends Vue {
    public render(h) {
        return <div>
                    <p>Oops. Page not found :(</p>
               </div>;
    }
}
