import Vue from 'vue';
import Component from 'vue-class-component';
import { Logger } from '../util/log';
import { spawn } from 'child_process';
import { AppStoreType } from '../store/index';
import { Route } from 'vue-router';
import { ILogos, LogosClient } from '../clients/logos';

@Component({
    metaInfo: {
        title: '$lang-en(About)$lang-ru(О сайте)',
    },
})
export class AboutComponent extends Vue {
    public logos?: ILogos;
    
    /**
     * This prefetch function load data directly from a data client
     * The data from server called every time on new component instance is created
     */
    public static async prefetch ({ store, route }: { store: AppStoreType, route: Route }) {
        const client = new LogosClient();
        
        // call data from the server
        const logos = await client.list();

        return {
            logos, // will update class instance field
        };
    }

    render(h) {
        return <div class="container">
                    <h1 lang="en">Starring</h1>
                    <h1 lang="ru">В главных ролях</h1>

                    <div class="row align-items-center">
                        {
                            Object.entries(this.logos).map(([key, value]) => {
                                return <div class="col-sm p-2">
                                            <img src={`/assets/img/${key}.svg`} alt={ value } title={ value }  width="200px"/>
                                       </div>;
                            })
                        }
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-12 p-2 text-center">
                            <span lang="en">and many others...</span>
                            <span lang="ru">и многие другие...</span>
                        </div>
                    </div>
                </div>;
    }
}
