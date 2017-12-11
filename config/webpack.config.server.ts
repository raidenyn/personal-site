// tslint:disable:variable-name
import { root } from '../helpers';
import { baseConfig, IAppWebpackOptions, configurations } from './webpack.config.base';

import prodEnv from '../environment/prod.env';
import devEnv from '../environment/dev.env';

import merge = require('webpack-merge');
import webpack = require('webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

export interface IServerAppWebpackOptions extends IAppWebpackOptions { }

export function serverConfig(options: IServerAppWebpackOptions) {
    const base = baseConfig(options);

    return merge(base, {
        target: 'node',
        devtool: false,
        entry: root('./src/enter.server.ts'),
        output: {
            filename: `server-bundle-${options.lang}.js`,
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [
                {
                    /**
                     * Suppress style loading on server side
                     */
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'null-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [
            /**
             * Set server side constants
             */
            new webpack.DefinePlugin({
                ENVIRONMENT: {
                    ...(process.env.NODE_ENV === 'production' ? prodEnv : devEnv),
                    VUE_ENV: JSON.stringify('server'),
                },
                window: 'undefined',
            }),
            /**
             * Emit SSR bundle
             */
            new VueSSRServerPlugin({
                filename: `vue-ssr-server-bundle-${options.lang}.json`,
            }),
        ],
    });
}

export default configurations(serverConfig);
