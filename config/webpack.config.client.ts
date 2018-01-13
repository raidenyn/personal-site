// tslint:disable:variable-name
import { root, node_modules } from '../helpers';
import { baseConfig, configurations as baseConfigurations, IAppWebpackOptions } from './webpack.config.base';
import { swConfig } from './webpack.config.sw';

import webpack = require('webpack');
import merge = require('webpack-merge');

import ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
import VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
import CopyWebpackPlugin = require('copy-webpack-plugin');
import autoprefixer = require('autoprefixer');
import ExtractTextPlugin = require('extract-text-webpack-plugin');
import FaviconsWebpackPlugin = require('favicons-webpack-plugin');

export function configurations(config: (options: IClientAppWebpackOptions) => webpack.Configuration, options?: IClientAppWebpackOptions) {
    return baseConfigurations(config, options);
} 

export interface IClientAppWebpackOptions extends IAppWebpackOptions { }

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
                    use: ExtractTextPlugin.extract({
                        use: [{
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
                    }),
                },
            ],
        },
        plugins: [
            /**
             * Mark all script files as 'preload' in html head
             */
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer',
                preload: [/polyfills|vendor|main/],
                prefetch: [/chunk/],
            }),
            /**
             * Separate all third party packages into separated file
             */
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks(module, count) {
                    const context = module.context;
                    // returns true for all packages in the node_modules folder, but not exists in bootstrap
                    return !!context && context.indexOf('node_modules') >= 0 && bootstrap.reduce((prev: boolean, name: string) => { 
                        return prev && context.indexOf(name) < 0; 
                    }, true);
                },
            }),
            /**
             * Separate all polyfills into separated file
             */
            new webpack.optimize.CommonsChunkPlugin({
                name: 'polyfills',
                minChunks(module, count) {
                    const context = module.context;
                    
                    const polyfills = ['core-js', 'setimmediate', 'regenerator-runtime', '@babel'];
    
                    // returns true for all polyfills packages
                    return !!context && polyfills.reduce((prev: boolean, name: string) => { 
                        return prev || context.indexOf(name) >= 0; 
                    }, false);
                },
            }),
            /**
             * Separate manifest into separated file
             */
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest'],
            }),
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
                to: './assets',
            }]),
            /**
             * Copy data files
             */
            new CopyWebpackPlugin([{
                from: 'data',
                to: './data',
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
    });
}
