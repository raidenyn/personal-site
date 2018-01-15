<script lang="tsx">
import Vue from 'vue';
import { NavbarComponent } from './components/navbar';
import { SwitchLanguageComponent } from './components/switch-lang';
import { SiteLinkComponent } from './components/shared/site-link';
import { VERSION } from './version';

export default {
    name: 'ynagaev',
    components: {
        navbar: NavbarComponent,
        'switch-lang': SwitchLanguageComponent,
        'site-link': SiteLinkComponent,
    },
    metaInfo: {
      title: 'Yuriy Nagaev',
      titleTemplate: '%s | Yuriy Nagaev',
      htmlAttrs: {
          lang: 'en'
      }
    },
    computed: {
        version: () => VERSION,
    },
};
</script>

<template>
  <div id="app-main"> 
    <header class="header clearfix">
      <nav class="navbar navbar-expand-sm navbar-dark justify-content-between">
        <h3 class="navbar-brand">
            <site-link href="/">
                <img src="/assets/img/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                YN
            </site-link>
        </h3>

        <switch-lang></switch-lang>

        <navbar :inverted="false"></navbar>
      </nav>
    </header>

    <main role="main" class="content container">
        <div class='row justify-content-md-center mt-5'>
            <div class='col col-md-12'>
                <router-view></router-view>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="copyright">
            <p lang="en">YN 2017</p>
            <p lang="ru">ЮН 2017</p>
            <small class="text-muted">v{{ version }}</small>
        </div>
    </footer>
  </div>
</template>
