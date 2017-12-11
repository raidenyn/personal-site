import Vue from 'vue';
import Component from 'vue-class-component';
import { Logger } from '../util/log';
import { spawn } from 'child_process';

@Component({
    metaInfo: {
        title: '$lang-en(About)$lang-ru(О сайте)',
    },
})
export class AboutComponent extends Vue {

    public logos = {
        ubuntu: 'Ubuntu',
        docker: 'Docker, Docker Compose',
        nginx: 'Nginx, Nginx Amplify',
        nodejs: 'NodeJS',
        express: 'Express',
        vue: 'Vue, Vue SSR, Vuex',
        typescript: 'TypeScript',
        webpack: 'Webpack',
        babel: 'Babel',
        bootstrap: 'Bootstrap',
    };

    render(h) {
        return <div class="container">
                    <h1 lang="en">Starring</h1>
                    <h1 lang="ru">В гоавных ролях</h1>

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
