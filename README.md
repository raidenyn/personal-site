# My Home Page

This is home page of [my site](https://ynagaev.ru). It was created as starting point for my other projects. So you can find here a lot of excessive and unused details for current project but they can be useful for yours.

## Main features

* Main code are based on [Vue framework 2.5.*](https://vuejs.org/)
* All site code and build configurations wrote on [TypeScript 2.6.*](https://www.typescriptlang.org/)
* [TSLint](https://palantir.github.io/tslint/) rules for all scripts
* For storing date the site uses on [Vuex 3.0.*](https://vuex.vuejs.org)
* Server Side Rendering (SSR) based on [vue-ssr](https://ssr.vuejs.org/)
* [Vue Router](https://router.vuejs.org/) for site routing
* Supporting [React like](https://reactjs.org/docs/jsx-in-depth.html) render functions inside *.tsx and *.vue files
* Using [Babel 7](https://github.com/babel/babel/wiki/Babel-7) for effective code transpilation to ES5.
* Using [Bootstrap 4](https://getbootstrap.com/) as style framework with [SASS](http://sass-lang.com/) compilation and modifications via sass variables.
* Using [Font Awesome 5](https://fontawesome.com/) for site icons.
* Generating site favicons for all popular platforms on build
* Using Service Worker for working in offline
* Run client side tests on [Karma](https://karma-runner.github.io/1.0/index.html)
* Generate test coverage report by [Istanbul project](https://istanbul.js.org/)
* Multilanguage supporting (*please see notes bellow*)
* Supporting [Docker](https://www.docker.com/) container as build destination

### Multilanguage
Provided way for multilanguage supportng is not common and shouldn't be used for site with many languages.
But if you have only 2 or 3 languages you can follow by this way.

You can mark language relative part of you template (doesn't matter vue or react) by `lang` attribute:
``` html
<div>
    <span lang="ru">Это русский текст</span>
    <span lang="en">It is English text</span>
<div>
```

Webpack loader just remove all tags with not current text, so at the result you receive for `lang='en'`:
``` html
<div>

    <span lang="en">It is English text</span>
<div>
```
And for `lang='ru'`:
``` html
<div>
    <span lang="ru">Это русский текст</span>

<div>
```

In this case Webpack creates two different packages for each language.

Also you can set translation in any places outside html elements. It can be html attributes or javascript variables:
``` html
<div>
    <input name="name" placeholder="$lang-en(Your name)$lang-ru(Ваше имя)"/>
<div>
```

``` ts
class MyComponent {
    public userText = '$lang-en(Warning)$lang-ru(Внимание)';
}
```

## Build Setup

``` bash
# install dependencies
yarn install

# build client and server side in watch mode, run server on 8080 port with SSR
yarn dev

# run all Karma tests
yarn test

# run all Karma tests in watch mode
yarn test:watch

# run the test suite and generate a coverage report
yarn run coverage

# Run the tests and build the site in production mode
yarn build

# clean the production build
yarn clean
```
