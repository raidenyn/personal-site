// tslint:disable:variable-name
import { root } from '../helpers';
import { clientConfig, configurations,  IClientAppWebpackOptions } from './webpack.config.client';
import { Configuration } from 'webpack';
import env from '../environment/prod.env';

import merge = require('webpack-merge');
import fs = require('fs');
import glob = require('glob');
import path = require('path');
import webpack = require('webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import CompressionPlugin = require('compression-webpack-plugin');
import PurgecssPlugin = require('purgecss-webpack-plugin');
import DefinePlugin = require('webpack/lib/DefinePlugin');
import MiniCssExtractPlugin = require('mini-css-extract-plugin');
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
import OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

export function clientProdConfig(options: IClientAppWebpackOptions): Configuration {
    const base = clientConfig({ isDev: false , ...options });

    return merge(base, {
        /**
         * For production environment emit all files with hashes
         * This files should be cached by proxies and clients.
         */
        output: {
            filename: 'js/[name].[chunkhash:10].js',
            publicPath: '/',
            sourceMapFilename: 'js/[file].map',
            chunkFilename: 'js/[name].[chunkhash:10].chunk.js',
        },
        devtool: false,
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        ecma: 6,
                        compress: true,
                        mangle: true,
                        toplevel: true, // danger!!!
                    },
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        plugins: [
            /**
             * Extract all styles into separated files
             */
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash:10].css',
            }),
            /**
             * Remove all unused css definitions
             */
            new PurgecssPlugin({
                paths: [
                    ...glob.sync(root('src/**/*.html')),
                    ...glob.sync(root('src/**/*.vue')),
                    ...glob.sync(root('src/**/*.vuex')),
                    ...glob.sync(root('src/**/*.tsx')),
                ],
                minimize: true,
            }),
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
             * Mark all script files as 'preload' in html head
             */
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer',
                preload: [/polyfills|vendor|main/],
                prefetch: [/chunk/],
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
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: '../.report/bundle.html',
            }),
        ],
    } as Configuration as any) as any;
}

export default configurations(clientProdConfig);
