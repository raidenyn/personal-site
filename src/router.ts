import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from './components/home.vue';
import { AboutComponent } from './components/about';
import { ContactsComponent } from './components/contacts';
import { NotFoundPage } from './components/not-found';

// register the plugin
Vue.use(VueRouter);
   
export default () => new VueRouter({
    routes: [
        { path: '/', component: HomeComponent },
        { path: '/about', component: AboutComponent },
        { path: '/contacts', component: ContactsComponent },
        { path: '*', component: NotFoundPage },
    ],
    mode: 'history',
});
