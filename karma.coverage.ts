const parseArgs = require('minimist');
import { coverageConfig } from './config/webpack.config.coverage';
import { Config } from 'karma';

const args = parseArgs(process.argv.slice(2), {
    string: ['env'],
    default: {
        env: 'mocha',
    },
});

let reporters = ['mocha', 'coverage'];

if (args.env === 'jk') {
    reporters = ['junit', 'coverage'];
}

export default function (config: Config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'src/**/*.spec.ts',
        ],
        reporters,
        preprocessors: {
            '**/*.ts': ['webpack'],
        },
        webpack: coverageConfig({ lang: 'en' }),
        junitReporter: {
            outputDir: 'reports/',
        },
        coverageReporter: {
            reporters: [{
                type: 'json',
                dir: 'coverage/json',
                subdir: '.',
            }],
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        mime: {
            'text/x-typescript': ['ts'],
        },
        singleRun: true,
        concurrency: Infinity,
    } as any);
}
