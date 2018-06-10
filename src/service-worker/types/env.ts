declare interface ISwEnvironment {
    MODE: 'development' | 'production';

    DEBUG_MODE: boolean;
}

declare const SW_ENVIRONMENT: ISwEnvironment;
