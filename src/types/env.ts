declare interface IEnvironment {
    MODE: 'development' | 'production';

    DEBUG_MODE: boolean;

    API_KEY: string;

    VUE_ENV?: 'server';
}

declare const ENVIRONMENT: IEnvironment;
