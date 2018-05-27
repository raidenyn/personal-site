// tslint:disable:variable-name
import { root } from '../helpers';
import webpack = require('webpack');
import VueLoaderPlugin = require('vue-loader/lib/plugin');
import { Configuration } from 'webpack';

export interface IAppWebpackOptions {
    lang: 'en' | 'ru';
}

export function configurations(config: (options: IAppWebpackOptions) => Configuration, options?: IAppWebpackOptions) {
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
                    exclude: /node_modules|vue/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: { /* https://github.com/wbuchwalter/tslint-loader */ },
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            },
                        },
                        {
                            loader:'ts-loader',
                            options: { appendTsxSuffixTo: [/\.vue$/] },
                        },
                        {
                            loader: `lang-loader?lang=${options.lang}`,
                        },
                        {
                            loader:'import-glob',
                        },
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.html$/,
                    oneOf: [
                        {
                            resourceQuery: /^\?vue/,
                            use: [
                                {
                                    loader: 'lang-loader',
                                    options: { lang: options.lang },
                                },
                            ],
                        },
                        {
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
        plugins: [
            new VueLoaderPlugin(),
        ],
    } as Configuration as any; // cast to any to avoid TS definitions miss match. ToDo: remove any in the future
}
