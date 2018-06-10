// tslint:disable:variable-name
import { root } from '../helpers';
import webpack = require('webpack');

import prodEnv from '../environment/prod.env';
import devEnv from '../environment/dev.env';

import WriteFilePlugin = require('write-file-webpack-plugin');

export function swConfig(): webpack.Configuration {
    return {
        entry: {
            sw: root('/src/service-worker/service-worker.ts'),
        },
        externals: {
            'workbox-sw': 'workbox',
        },
        output: {
            path: root('/dist'),
            filename: 'sw.js',
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                },
                {
                    test: /\.ts$/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'src/service-worker/tsconfig.json',
                            },
                        },
                        'import-glob',
                    ],
                },
            ],
        },
        plugins: [
            /**
             * Force swap all files to disk
             * For SSR environment all files is processed by Express
             */
            new WriteFilePlugin(),
            new webpack.DefinePlugin({
                SW_ENVIRONMENT: {
                    ...(process.env.NODE_ENV === 'production' ? prodEnv : devEnv),
                },
            }),
        ],
    };
}

export default swConfig();
