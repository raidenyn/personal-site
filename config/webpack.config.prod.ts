// tslint:disable:variable-name
import { root } from '../helpers';
import { clientConfig, configurations,  IClientAppWebpackOptions } from './webpack.config.client';
import env from '../environment/prod.env';

import merge = require('webpack-merge');
import fs = require('fs');
import glob = require('glob');
import path = require('path');
import webpack = require('webpack');
import UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import CompressionPlugin = require('compression-webpack-plugin');
import PurifyCSSPlugin = require('purifycss-webpack');
import DefinePlugin = require('webpack/lib/DefinePlugin');
import ExtractTextPlugin = require('extract-text-webpack-plugin');

export function clientProdConfig(options: IClientAppWebpackOptions) {
    const base = clientConfig(options);

    return merge(base, {
        /**
         * For production environment emit all files with hashes
         * This files should be cached by proxyies and clients.
         */
        output: {
            filename: 'js/[name].[chunkhash:10].js',
            publicPath: '/',
            sourceMapFilename: '[file].map',
            chunkFilename: '[name].[chunkhash:10].chunk.js',
        },
        devtool: false,
        plugins: [
            /**
             * Extract all styles into separated files
             */
            new ExtractTextPlugin({
                filename: 'css/[name].[hash:10].css',
                allChunks: true,
            }),
            /**
             * Remove all unused css definitions
             */
            new PurifyCSSPlugin({
                paths: [
                    ...glob.sync(root('src/**/*.html')),
                    ...glob.sync(root('src/**/*.vue')),
                    ...glob.sync(root('src/**/*.vuex')),
                    ...glob.sync(root('src/**/*.tsx')),
                ],
                purifyOptions: {
                    info: true,
                    whitelist: ['*navbar*'],
                },
                minimize: true,
            }),
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackPlugin({
                inject: false,
                template: root('/src/ssr-layout.html'),
                filename: `ssr-layout-${options.lang}.html`,
                minify: {
                    caseSensitive: true,
                    removeComments: false,
                    collapseWhitespace: false,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: root('/src/spa-index.html'),
                filename: `spa-index-${options.lang}.html`,
                minify: {
                    removeComments: false,
                    collapseWhitespace: false,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: false,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            /**
             * Precompress all files
             */
            new CompressionPlugin({
                asset: '[path].gz[query]',
                test: /\.(js|css|html)$/,
            }),
            new DefinePlugin({
                ENVIRONMENT: env,
            }),
        ],
    });
}

export default configurations(clientProdConfig);
