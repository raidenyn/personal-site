import { Request } from 'express';
import { IAppState } from '../store/index';

declare module 'express' {
    interface Request {
        route?: IRouteInfo;

        state?: IAppState;
    }
}

declare interface IRouteInfo {
    statusCode?: number;
}
