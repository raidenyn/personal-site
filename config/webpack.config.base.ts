// tslint:disable:variable-name
import { root } from '../helpers';
import webpack = require('webpack');

export interface IAppWebpackOptions {
    lang: 'en' | 'ru';
}

export function configurations(config: (options: IAppWebpackOptions) => webpack.Configuration, options?: IAppWebpackOptions) {
    return [
        config({ lang: 'ru', ...options }),
        config({ lang: 'en', ...options }),
    ];
} 

export function baseConfig(options: IAppWebpackOptions) {
    return {
        output: {
            path: root('/dist'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.vuex', '.html'],
            alias: {
                vue$: 'vue/dist/vue.runtime.esm.js',
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                },
                { 
                    test: /\.tsx?$/, 
                    use: [
                        'babel-loader',
                        {
                            loader:'ts-loader',
                            options: { appendTsxSuffixTo: [/\.vue$/] }, 
                        },
                        {
                            loader: 'lang-loader',
                            options: { lang: options.lang }, 
                        },
                        {
                            loader:'import-glob',
                        },
                    ],
                },
                { 
                    test: /\.vue$/, 
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            html: `lang-loader?lang=${options.lang}`,
                            scss: 'vue-style-loader!css-loader!sass-loader',
                            ts: ['babel-loader', { loader: `ts-loader!lang-loader`, options: { appendTsxSuffixTo: [/\.vue$/], lang: options.lang } }],
                            tsx: ['babel-loader', { loader: `ts-loader!lang-loader`, options: { appendTsxSuffixTo: [/\.vue$/], lang: options.lang } }],
                        },
                        extractCSS: true,
                        esModule: true,
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: false,
                                interpolate: true,
                            },
                        },
                        {
                            loader: 'lang-loader',
                            options: { lang: options.lang }, 
                        },
                    ],
                },
                {
                    test: [/\.(jpg|png|gif)$/, /img\/.*?\.(svg)$/],
                    loader: 'file-loader?name=assets/img/[name].[ext]',
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]',
                },
            ],
        },
        resolveLoader: {
            alias: {
                'lang-loader': root('config/loaders/lang-loader.ts'),
            },
        },
    } as webpack.Configuration;
}
