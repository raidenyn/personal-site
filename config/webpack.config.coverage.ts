import webpackConfig from './webpack.config.test';
import { IAppWebpackOptions, baseConfig, configurations } from './webpack.config.base';

import merge = require('webpack-merge');

export function coverageConfig(options: IAppWebpackOptions) {
    const base = baseConfig(options);

    return merge(base, {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    enforce: 'post',
                    loader: 'istanbul-instrumenter-loader',
                    exclude: [
                        'node_modules',
                        /\.spec\.ts$/,
                    ],
                    query: {
                        esModules: true,
                    },
                },
            ],
        },
    });
}

export default configurations(coverageConfig);
