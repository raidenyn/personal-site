import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    metaInfo: {
        title: 'Not Found',
    },
})
export class NotFoundPage extends Vue {
    render(h) {
        return <div>
                    <p>Oops. Page not found :(</p>
               </div>;
    }
}
