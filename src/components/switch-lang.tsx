import Vue from 'vue';
import Component from 'vue-class-component';

import * as Cookie from 'js-cookie';

@Component({
    metaInfo: {
        title: 'Not Found',
    },
    name: 'switch-lang',
    serverCacheKey: props => '-',
})
export class SwitchLanguageComponent extends Vue {
    private _current: 'ru' | 'en';
    
    public render(h) {
        return <div>
                    <button class="btn btn-link cursor" onClick={this.toggle} style="cursor: pointer;">
                        <span lang="ru">
                            eng
                        </span>
                        <span lang="en">
                            рус
                        </span>
                    </button>
               </div>;
    }

    public get current() {
        if (this._current) {
            return this._current;
        }

        let lang = Cookie.get('lang') as 'en' | 'ru';

        if (lang !== 'ru') {
            lang = 'en';
        }

        return this._current = lang;
    }

    public get inverse() {
        return this.current === 'ru' ? 'en' : 'ru';
    }

    public toggle() {
        this._current = this.inverse;
        Cookie.set('lang', this._current);

        document.location.reload(true);
    }
}
