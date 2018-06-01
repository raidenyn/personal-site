// tslint:disable:variable-name
import { root } from '../helpers';
import { clientConfig, configurations, IClientAppWebpackOptions } from './webpack.config.client';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import env from '../environment/dev.env';

import merge = require('webpack-merge');

import HtmlWebpackPlugin = require('html-webpack-plugin');
import WriteFilePlugin = require('write-file-webpack-plugin');
import DefinePlugin = require('webpack/lib/DefinePlugin');

export function clientDevConfig(options: IClientAppWebpackOptions): Configuration {
    const base = clientConfig({ isDev: true , ...options });

    return merge(base, {
        /**
         * In dev mode emit files with lang prefix
         */
        output: {
            filename: `js/[name]-${options.lang}.js`,
        },
        /**
         * Enable including source map
         */
        devtool: 'source-map',
        mode: 'development',
        plugins: [
            /**
             * Force swap all files to disk
             * For SSR environment all files is processed by Express
             */
            new WriteFilePlugin(),
            /**
             * Emit layout file for SSR
             */
            new HtmlWebpackPlugin({
                inject: false,
                template: root('/src/ssr-layout.html'),
                filename: `ssr-layout-${options.lang}.html`,
            }),
            /**
             * Emit SPA index file for fallback
             */
            new HtmlWebpackPlugin({
                inject: true,
                template: root('/src/spa-index.html'),
                filename: `spa-index-${options.lang}.html`,
            }),
            /**
             * Put environment constants for using inside code
             */
            new DefinePlugin({
                ENVIRONMENT: env,
            }),
        ],
        /**
         * Dev server reloads site on file changing
         */
        devServer: {
            port: 8081,
            host: 'localhost',
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000,
            },
            contentBase: './dist',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        } as DevServerConfiguration,
    } as Configuration as any) as any;
}

export default configurations(clientDevConfig);
