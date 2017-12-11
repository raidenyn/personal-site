import { testConfig } from './config/webpack.config.test';

export default function (config) {
    config.set({
        basePath: '',
        frameworks: ['source-map-support', 'mocha', 'chai', 'sinon'],
        files: [
            'src/test.ts',
        ],
        reporters: ['mocha'],
        preprocessors: {
            'src/test.ts': ['webpack'],
        },
        webpack: testConfig({ lang: 'en' }),
        webpackServer: {
            noInfo: true,
        },
        mime: {
            'text/x-typescript': ['ts'],
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome_with_debugging'],
        customLaunchers: {
            Chrome_with_debugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222'],
                debug: true,
            },
        },
        singleRun: false,
    });
}
