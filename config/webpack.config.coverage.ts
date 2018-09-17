import { testConfig } from './webpack.config.test';
import { IAppWebpackOptions, baseConfig, configurations } from './webpack.config.base';
import { Configuration } from 'webpack';

import merge = require('webpack-merge');

export function coverageConfig(options: IAppWebpackOptions): Configuration {
    const base = testConfig(options);

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
    } as Configuration as any) as any;
}

export default configurations(coverageConfig);
