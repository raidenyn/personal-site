import { http } from './http';

export interface ILogosClient {
    list(): Promise<ILogos>;
}

export class LogosClient {
    private http = http;

    public list(): Promise<ILogos> {
        return this.http.get('/data/logos.json')
                        .then(response => response.data);
    }
}

export interface ILogos {
    [name: string]: string;
}
