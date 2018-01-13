import Vue from 'vue';
import Component from 'vue-class-component';

import * as Cookie from 'js-cookie';

@Component({
    metaInfo: {
        title: 'Not Found',
    },
})
export class SwitchLanguageComponent extends Vue {
    private _current: 'ru' | 'en';
    
    render(h) {
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

    get current() {
        if (this._current) {
            return this._current;
        }

        let lang = Cookie.get('lang') as 'en' | 'ru';

        if (lang !== 'ru') {
            lang = 'en';
        }

        return this._current = lang;
    }

    get inverse() {
        return this.current === 'ru' ? 'en' : 'ru';
    }

    toggle() {
        this._current = this.inverse;
        Cookie.set('lang', this._current);

        document.location.reload(true);
    }
}
