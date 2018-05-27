// tslint:disable:variable-name
import { root } from '../helpers';
import webpack = require('webpack');

const WriteFilePlugin = require('write-file-webpack-plugin');

export function swConfig(): webpack.Configuration {
    return {
        entry: {
            sw: root('/src/service-worker/service-worker.ts'),
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
                        'ts-loader',
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
        ],
    };
}

export default swConfig();
