// tslint:disable:variable-name
import { root, node_modules } from '../helpers';
import { baseConfig, configurations as baseConfigurations, IAppWebpackOptions } from './webpack.config.base';
import { swConfig } from './webpack.config.sw';
import { Configuration } from 'webpack';
import { modules } from './utils/chunks-filter';

import webpack = require('webpack');
import merge = require('webpack-merge');

import VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
import CopyWebpackPlugin = require('copy-webpack-plugin');
import autoprefixer = require('autoprefixer');
import FaviconsWebpackPlugin = require('favicons-webpack-plugin');

import MiniCssExtractPlugin = require('mini-css-extract-plugin');

export function configurations(config: (options: IClientAppWebpackOptions) => webpack.Configuration, options?: IClientAppWebpackOptions) {
    return baseConfigurations(config, options);
}

export interface IClientAppWebpackOptions extends IAppWebpackOptions {
    isDev: boolean;
}

export function clientConfig(options: IClientAppWebpackOptions) {
    const base = baseConfig(options);

    const bootstrap = [
        'jquery',
        'popper.js',
        'bootstrap',
    ];

    return merge(base, {
        entry: {
            /**
             * Main entry point for the site
             */
            main: root('/src/enter.client.ts'),
            /**
             * Additional Bootstrap files
             */
            bootstrap,
        },
        resolve: {
            /**
             * Set real path to JQuery library
             */
            alias: {
                jquery: 'jquery/dist/jquery.slim',
            },
        },
        module: {
            rules: [
                /**
                 * Extract all styles into one separated file
                 */
                {
                    test: /\.scss$/,
                    use: [
                        options.isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer],
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true,
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            sideEffects: false,
            runtimeChunk: true,
            mergeDuplicateChunks: true,
            usedExports: true,
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    polyfills: {
                        chunks: 'all',
                        name: 'polyfills',
                        test: modules([
                            'setimmediate',
                            'core-js',
                            'regenerator-runtime',
                            '@babel',
                            'tslib',
                        ]),
                        priority: -10,
                        enforce: true,
                    },
                    bootstrap: {
                        chunks: 'all',
                        name: 'bootstrap',
                        test: /bootstrap/,
                        priority: -20,
                        enforce: true,
                    },
                    vendors: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: /node_modules/,
                        priority: -40,
                        enforce: true,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        plugins: [
            /**
             * Create aliases for packages which should be available via global variables
             */
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                Popper: 'popper.js',
            }),
            /**
             * Copy assets folder as is
             */
            new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets',
            }]),
            /**
             * Copy data files
             */
            new CopyWebpackPlugin([{
                from: 'data',
                to: 'data',
            }]),
            /**
             * Generate Vue SSR manifest for client side
             * See: https://ssr.vuejs.org/ru/api.html#webpack-plugins
             */
            new VueSSRClientPlugin({
                filename: `vue-ssr-client-manifest-${options.lang}.json`,
            }),
            /**
             * Generate Favicons from one logo file
             */
            new FaviconsWebpackPlugin({
                // should be svg here but Phantom.JS under linux crashes builds
                logo: root('/src/assets/img/logo.png'),
                persistentCache: true,
                inject: true,
                background: '#333',
                title: `Yuriy's home site`,
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    opengraph: false,
                    twitter: false,
                    yandex: true,
                    windows: true,
                },
            }),
        ],
    } as Configuration as any) as any;  // cast to `any` to avoid TS definitions miss match. ToDo: remove any in the future
}
