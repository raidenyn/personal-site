<script lang="tsx">
import Vue from 'vue';
import Component from 'vue-class-component';

import '../types/meta-info';
import '../types/server-cache';
import '../types/env';

@Component({
    metaInfo: {
        title: '$lang-en(Home)$lang-ru(Домашняя страница)'
    },
    name: 'home',
    serverCacheKey: props => '-',
})
export default class HomeComponent extends Vue {
    public render(h) {
        return <div>
                    <div lang="en">
                        <h1>Hi everybody!</h1>
                        <p>You are in Yuriy Nagaev's home page</p>
                        <p>Actually I have no idea what you can find interesting here</p>
                        <p>
                            Anyway you can look at <router-link to="/about">tech stack</router-link> of this site 
                            or check <router-link to="/contacts">my contacts</router-link>.
                        </p>
                    </div>

                    <div lang="ru">
                        <h1>Всем привет!</h1>
                        <p>Вы находитесь на домашней странице Юрия Нагаева</p>
                        <p>И, признаться, я совершенно не знаю, что бы вас могло здесь заинтересовать.</p>
                        <p>
                            Так или иначе вы можете посмотреть на <router-link to="/about">технологический стек</router-link> этого сайта 
                            или проверить <router-link to="/contacts">мою контактную информацию</router-link>.
                        </p>
                    </div>
                </div>;
    }
}
</script>
