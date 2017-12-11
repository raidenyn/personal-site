import { baseConfig, configurations, IAppWebpackOptions } from './webpack.config.base';
import env from '../environment/dev.env';

import merge = require('webpack-merge');
import DefinePlugin = require('webpack/lib/DefinePlugin');
import SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');

export function testConfig(options: IAppWebpackOptions) {
    const base = baseConfig(options);

    return merge(base, {
        devtool: 'inline-source-map',
        plugins: [
            new SourceMapDevToolPlugin({
                filename: null, // if no value is provided the sourcemap is inlined
                test: /\.(tsx?|jsx?)($|\?)/i,
            }),
            new DefinePlugin({
                ENVIRONMENT: require('../environment/dev.env'),
            }),
        ],
    });
}

export default configurations(testConfig);
