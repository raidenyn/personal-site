import { testConfig } from './config/webpack.config.test';

export default function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'src/**/*.spec.ts',
        ],
        preprocessors: {
            '**/*.ts': ['webpack'],
        },
        webpack: testConfig({ lang: 'en' }),
        webpackMiddleware: {
            serverSideRender: true,
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        mime: {
            'text/x-typescript': ['ts'],
        },
        singleRun: true,
    });
}
