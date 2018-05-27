import { baseConfig, configurations, IAppWebpackOptions } from './webpack.config.base';
import env from '../environment/dev.env';

import merge = require('webpack-merge');
import DefinePlugin = require('webpack/lib/DefinePlugin');
import SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
import { Configuration } from 'webpack';

export function testConfig(options: IAppWebpackOptions) {
    const base = baseConfig(options);

    return merge(base, {
        devtool: 'inline-source-map',
        mode: 'none',
        plugins: [
            new SourceMapDevToolPlugin({
                filename: null, // if no value is provided the sourcemaps is inlined
                test: /\.(tsx?|jsx?)($|\?)/i,
            }),
            new DefinePlugin({
                ENVIRONMENT: require('../environment/dev.env'),
            }),
        ],
    } as Configuration as any) as any;
}

export default configurations(testConfig);
